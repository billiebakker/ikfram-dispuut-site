<script>
import PostItem from '@/components/PostComponents/PostItem.vue'
import CreatePost from '@/components/PostComponents/CreatePost.vue'
import { postCollection } from '@/includes/firebase.js'
import { getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'

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
        querySnapshot.forEach((docSnap) => {
          this.posts.push({
            docID: docSnap.id,
            ...docSnap.data(),
          })
        })

        // update lastDoc with the last visible document
        this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
      } else {
        // no more documents to fetch
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
    <template v-for="post in posts" :key="post.docID">
      <PostItem :post="post" />
    </template>
    <button
      class="w-[224px] h-[42px] rounded outline outline-2 outline-offset-[-1px] outline-ribbook-yellow text-ribbook-yellow flex justify-center items-center gap-2.5"
      @click="getPosts"
    >
      {{ loadMoreButtonText }}
    </button>
  </div>
</template>
