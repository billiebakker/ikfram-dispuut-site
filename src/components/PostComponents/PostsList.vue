<script>
import PostItem from '@/components/PostComponents/PostItem.vue'
import CreatePost from '@/components/PostComponents/CreatePost.vue'
import usePostsStore from '@/stores/posts'

export default {
  name: 'PostsList',
  components: { CreatePost, PostItem },
  computed: {
    posts() {
      return usePostsStore().posts
    },
    pendingRequest() {
      return usePostsStore().pendingRequest
    },
    noMorePosts() {
      return usePostsStore().noMorePosts
    },
    loadMoreButtonText() {
      if (this.noMorePosts) return 'geen posts meer. ga posten!!!'
      if (this.pendingRequest) return 'aan het laden...'
      return 'meer laden'
    },
  },
  methods: {
    getPosts() {
      usePostsStore().fetchPosts()
    },
    refreshPosts() {
      usePostsStore().refreshPosts()
    },
    handleReaction(postId, type) {
      usePostsStore().handleReaction(postId, type)
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
