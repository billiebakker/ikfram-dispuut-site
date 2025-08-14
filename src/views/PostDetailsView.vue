<script>
import PostItem from '@/components/PostComponents/PostItem.vue'
import usePostsStore from '@/stores/posts'

export default {
  name: 'PostDetailsView',
  components: { PostItem },
  data() {
    return {
      post: null,
      pendingRequest: true,
      error: null,
    }
  },
  async created() {
    await usePostsStore()
      .fetchPostById(this.$route.params.id)
      .then((post) => {
        this.post = post
        this.pendingRequest = false
      })
  },
  methods: {
    handleReaction(postId, type) {
      usePostsStore().handleReaction(postId, type)
    },
  },
}
</script>

<template>
  <div class="w-full flex-1 px-2.5 py-1 flex flex-col items-center gap-2.5 overflow-auto">
    <div v-if="pendingRequest">Aan het laden...</div>
    <div v-else-if="error">{{ error }}</div>
    <PostItem
      v-else
      :post="post"
      @toggle-like="() => handleReaction(post.docID, 'like')"
      @toggle-dislike="() => handleReaction(post.docID, 'dislike')"
    />
  </div>
</template>
