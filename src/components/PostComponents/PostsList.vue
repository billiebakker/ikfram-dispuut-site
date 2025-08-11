<script>
import PostItem from '@/components/PostComponents/PostItem.vue'
import NewPostInput from '@/components/PostComponents/NewPostInput.vue'
import { postCollection } from '@/includes/firebase.js'
import { getDocs, query } from 'firebase/firestore'

export default {
  name: 'PostsList',
  components: { NewPostInput, PostItem },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    async getPosts() {
      const q = query(postCollection)
      const snapshots = await getDocs(q)

      this.posts = []
      snapshots.forEach((doc) => {
        this.posts.push({
          docID: doc.id,
          ...doc.data(),
        })
      })
    },
  },
  async created() {
    await this.getPosts()
  },
}
</script>

<template>
  <!--  TODO for all posts etc, endless scrolling maybe-->

  <div
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-x-scroll"
  >
    <NewPostInput />
    <template v-for="post in posts" :key="post.docId">
      <PostItem :post />
    </template>
  </div>
</template>
