import { defineStore } from 'pinia'
import { db, postCollection } from '@/includes/firebase'
import useUserStore from '@/stores/user'
import {
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore'

export default defineStore('posts', {
  state: () => ({
    posts: [],
    lastDoc: null,
    noMorePosts: false,
    pendingRequest: false,
    maxPostsPerPage: 6,
  }),
  actions: {
    async deletePost(postId) {
      const postRef = doc(db, 'posts', postId)
      await deleteDoc(postRef)
      this.posts = this.posts.filter((p) => p.docID !== postId)
    },
    async fetchPosts() {
      if (this.pendingRequest || this.noMorePosts) return
      this.pendingRequest = true

      const uid = useUserStore().currentUser?.uid || null

      const q = this.lastDoc
        ? query(
            postCollection,
            orderBy('datePosted', 'desc'),
            startAfter(this.lastDoc),
            limit(this.maxPostsPerPage),
          )
        : query(postCollection, orderBy('datePosted', 'desc'), limit(this.maxPostsPerPage))

      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        // posts mappen met like/dislikes van user
        const posts = snapshot.docs.map((docSnap) => {
          const data = docSnap.data()
          return {
            docID: docSnap.id,
            ...data,
            liked: uid ? data.reactions?.[uid] === 'like' : false,
            disliked: uid ? data.reactions?.[uid] === 'dislike' : false,
          }
        })

        // nieuwe posts toevoegen, duplication voorkomen
        posts.forEach((post) => {
          if (!this.posts.some((p) => p.docID === post.docID)) {
            this.posts.push(post)
          }
        })

        // laatste doc updaten voor pages
        this.lastDoc = snapshot.docs[snapshot.docs.length - 1]
      } else {
        this.noMorePosts = true
      }

      this.pendingRequest = false
    },

    async fetchPostById(postId) {
      const uid = useUserStore().currentUser?.uid || null

      const cached = this.posts.find((p) => p.docID === postId)
      if (cached) return cached

      const snap = await getDoc(doc(db, 'posts', postId))
      if (!snap.exists()) return null

      const data = snap.data()
      const post = {
        docID: snap.id,
        ...data,
        liked: uid ? data.reactions?.[uid] === 'like' : false,
        disliked: uid ? data.reactions?.[uid] === 'dislike' : false,
      }

      this.posts.push(post)
      return post
    },

    async handleReaction(postId, type) {
      const userStore = useUserStore()
      if (!userStore.currentUser) return
      const uid = userStore.currentUser.uid
      if (!uid) return

      const post = this.posts.find((p) => p.docID === postId)
      if (!post) return

      const otherType = type === 'like' ? 'dislike' : 'like'
      const wasActive = post[`${type}d`]
      const wasOtherActive = post[`${otherType}d`]

      const postRef = doc(db, 'posts', postId)

      // ui update voor db check
      post[`${type}d`] = !wasActive
      post[`${type}Count`] += wasActive ? -1 : 1
      if (wasOtherActive) {
        post[`${otherType}d`] = false
        post[`${otherType}Count`] = Math.max(0, post[`${otherType}Count`] - 1)
      }

      try {
        const updates = {}
        if (post[`${type}d`]) {
          updates[`reactions.${uid}`] = type
          updates[`${type}Count`] = increment(1)
          if (wasOtherActive) updates[`${otherType}Count`] = increment(-1)
        } else {
          updates[`reactions.${uid}`] = deleteField()
          updates[`${type}Count`] = increment(-1)
        }

        await updateDoc(postRef, updates)
      } catch (err) {
        console.error('Failed to update reaction:', err)

        // ui terug als error
        post[`${type}d`] = wasActive
        post[`${type}Count`] = wasActive
          ? post[`${type}Count`] + 1
          : Math.max(0, post[`${type}Count`] - 1)

        if (wasOtherActive !== post[`${otherType}d`]) {
          post[`${otherType}d`] = wasOtherActive
          post[`${otherType}Count`] = wasOtherActive
            ? post[`${otherType}Count`] + 1
            : Math.max(0, post[`${otherType}Count`] - 1)
        }
      }
    },

    async refreshPosts() {
      await this.resetPosts()
      await this.fetchPosts()
    },

    async resetPosts() {
      this.posts = []
      this.lastDoc = null
      this.noMorePosts = false
    },
  },
})
