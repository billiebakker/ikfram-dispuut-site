<script>
import PostItem from '@/components/PostComponents/PostItem.vue'
import CreatePost from '@/components/PostComponents/CreatePost.vue'
import { db, postCollection } from '@/includes/firebase.js'
import useUserStore from '@/stores/user'
import {
  deleteField,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore'

export default {
  name: 'PostsList',
  components: { CreatePost, PostItem },
  computed: {
    loadMoreButtonText() {
      if (this.noMorePosts) {
        return 'geen posts meer. ga posten!!!'
      }
      if (this.pendingRequest) {
        return 'aan het laden...'
      } else {
        return 'meer laden'
      }
    },
  },
  data() {
    return {
      posts: [],
      maxPostsPerPage: 4,
      pendingRequest: false,
      lastDoc: null,
      noMorePosts: false,
    }
  },
  methods: {
    async getPosts() {
      if (this.pendingRequest || this.noMorePosts) return
      this.pendingRequest = true

      // set null voor future proofing
      const uid = useUserStore().currentUser?.uid || null

      let q
      if (this.lastDoc) {
        q = query(
          postCollection,
          orderBy('datePosted', 'desc'),
          startAfter(this.lastDoc),
          limit(this.maxPostsPerPage),
        )
      } else {
        q = query(postCollection, orderBy('datePosted', 'desc'), limit(this.maxPostsPerPage))
      }

      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const posts = querySnapshot.docs.map((docSnap) => {
          const data = docSnap.data()
          return {
            docID: docSnap.id,
            ...data,
            // ook hier uid check (future proofing)
            liked: uid ? data.reactions?.[uid] === 'like' : false,
            disliked: uid ? data.reactions?.[uid] === 'dislike' : false,
          }
        })

        this.posts.push(...posts)

        // lastdoc updaten met laatste zichtbare doc
        this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
      } else {
        // geen posts meer
        this.noMorePosts = true
      }

      this.pendingRequest = false
    },
    async refreshPosts() {
      this.posts = []
      this.lastDoc = null
      this.noMorePosts = false
      await this.getPosts()
    },
    handleScroll(e) {
      const el = e.target
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
        this.getPosts()
      }
    },

    async handleReaction(postId, type) {
      const uid = useUserStore().currentUser.uid
      if (!uid) return

      const post = this.posts.find((p) => p.docID === postId)
      if (!post) return

      const otherType = type === 'like' ? 'dislike' : 'like'
      const wasActive = post[`${type}d`]
      const wasOtherActive = post[`${otherType}d`]
      const postRef = doc(db, 'posts', postId)

      // ui updaten (optimistic)
      post[`${type}d`] = !wasActive
      post[`${type}Count`] += wasActive ? -1 : 1
      if (wasOtherActive) {
        post[`${otherType}d`] = false
        post[`${otherType}Count`] = Math.max(0, post[`${otherType}Count`] - 1)
      }

      // db dingen
      try {
        let updates = {}
        if (post[`${type}d`]) {
          updates[`reactions.${uid}`] = type
          updates[`${type}Count`] = increment(1)
          if (wasOtherActive) {
            updates[`${otherType}Count`] = increment(-1)
          }
        } else {
          updates[`reactions.${uid}`] = deleteField()
          updates[`${type}Count`] = increment(-1)
        }

        await updateDoc(postRef, updates)
      } catch (error) {
        console.error(error)
        // als error ui terugzetten
        post[`${type}d`] = wasActive
        post[`${type}Count`] = wasActive
          ? post[`${type}Count`] + 1
          : Math.max(0, post[`${type}Count`] - 1)
        if (wasOtherActive !== post[`${otherType}d`]) {
          post[`${otherType}Count`] = wasOtherActive
            ? post[`${otherType}Count`] + 1
            : Math.max(0, post[`${otherType}Count`] - 1)
        }
      }
    },
  },
  async created() {
    await this.getPosts()
  },
}
</script>

<template>
  <div
    ref="scrollContainer"
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-auto"
    @scroll="handleScroll"
  >
    <CreatePost @newPostSubmitted="refreshPosts" />
    <PostItem
      v-for="post in posts"
      :key="post.docID"
      :post="post"
      @toggle-like="() => handleReaction(post.docID, 'like')"
      @toggle-dislike="() => handleReaction(post.docID, 'dislike')"
    />
    <button
      class="w-[224px] h-[42px] rounded outline outline-2 outline-offset-[-1px] outline-ribbook-yellow text-ribbook-yellow flex justify-center items-center gap-2.5"
      @click="getPosts"
    >
      {{ loadMoreButtonText }}
    </button>
  </div>
</template>
