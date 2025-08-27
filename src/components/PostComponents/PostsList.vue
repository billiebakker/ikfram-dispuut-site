<script>
import PostItem from '@/components/PostComponents/PostItem.vue'
import CreatePost from '@/components/PostComponents/CreatePost.vue'
import usePostsStore from '@/stores/posts'

export default {
  name: 'PostsList',
  components: { CreatePost, PostItem },
  data() {
    return {
      scrollParent: null,
      scrollHandler: null,
    }
  },
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
    handleDeletePost(postId) {
      usePostsStore().deletePost(postId)
    },
    // ja vibe code helaas, scrolling lastig
    getClosestScrollableParent(node) {
      let el = node && node.nodeType === 1 ? node.parentElement : null
      while (el && el !== document.body) {
        const style = getComputedStyle(el)
        const oy = style.overflowY
        if (oy === 'auto' || oy === 'scroll' || oy === 'overlay') return el
        el = el.parentElement
      }
      return window // fallback to page scrolling
    },
    checkAndLoadMore() {
      const el =
        this.scrollParent === window
          ? document.scrollingElement || document.documentElement
          : this.scrollParent

      if (!el) return
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100

      if (nearBottom) this.getPosts()
    },
  },
  async created() {
    await this.getPosts()
  },
  mounted() {
    this.scrollParent = this.getClosestScrollableParent(this.$el)

    // single handler reference for add/remove
    this.scrollHandler = () => this.checkAndLoadMore()

    if (this.scrollParent === window) {
      window.addEventListener('scroll', this.scrollHandler, { passive: true })
    } else if (this.scrollParent) {
      this.scrollParent.addEventListener('scroll', this.scrollHandler, { passive: true })
    }

    // run once in case we mount already near the bottom
    this.$nextTick(() => this.checkAndLoadMore())
  },
  beforeUnmount() {
    if (this.scrollParent === window) {
      window.removeEventListener('scroll', this.scrollHandler)
    } else if (this.scrollParent) {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler)
    }
  },
}
</script>

<template>
  <div class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5">
    <CreatePost @newPostSubmitted="refreshPosts" />
    <PostItem
      v-for="post in posts"
      :key="post.docID"
      :post="post"
      @toggle-like="() => handleReaction(post.docID, 'like')"
      @toggle-dislike="() => handleReaction(post.docID, 'dislike')"
      @delete-post="() => handleDeletePost(post.docID)"
    />
    <button
      class="w-[224px] h-[42px] rounded outline outline-2 outline-offset-[-1px] outline-ribbook-yellow text-ribbook-yellow flex justify-center items-center gap-2.5"
      @click="getPosts"
    >
      {{ loadMoreButtonText }}
    </button>
  </div>
</template>
