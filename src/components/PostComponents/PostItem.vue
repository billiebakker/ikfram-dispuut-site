<script>
import router from '@/router/index.js'
import ProfilePicture from '@/components/common/ProfilePicture.vue'
import useUserStore from '@/stores/user.js'

export default {
  name: 'PostItem',
  components: { ProfilePicture },
  props: {
    post: Object,
  },
  data() {
    return {
      showMenu: false,
    }
  },
  computed: {
    userHasAccess() {
      const isUsersPost = this.post.uid === useUserStore().currentUser.uid
      return isUsersPost || useUserStore().userProfile?.role === 'admin'
    },
  },
  emits: ['toggle-like', 'toggle-dislike', 'delete-post'],
  methods: {
    goToPost() {
      router.push({ name: 'post-detail', params: { id: this.post.docID } })
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    handleDeletePost() {
      if (!confirm('Weet je zeker dat je dit bericht wilt verwijderen?')) return
      this.$emit('delete-post', this.post.docID)
      // dit kan beter
      this.$router.go(-1)
    },
  },
}
</script>

<template>
  <section
    class="max-w-[480px] w-full bg-white rounded-xl outline outline-3 outline-ribbook-yellow flex flex-col items-center gap-2.5"
  >
    <!--    pf, naam, tijd, optie om te verwijderen -->
    <header class="w-full p-1.5 flex items-center gap-1" @click="goToPost">
      <div class="w-full flex items-center gap-1">
        <ProfilePicture :userPhotoURL="post.userPhotoURL" />
        <div class="px-2 flex flex-wrap items-center overflow-hidden">
          <h2 class="text-black pr-3 text-base font-semibold">
            {{ post.userDisplayName || 'Onbekend' }}
          </h2>
          <timeago class="text-text-muted text-sm" :datetime="post.datePosted" />
        </div>
      </div>

      <div class="relative" @click.stop="toggleMenu">
        <button class="flex items-center p-2 hover:bg-bg-light rounded-lg cursor-pointer">
          <!--          @click="toggleMenu"-->
          <span v-if="userHasAccess" class="icon icon-gray">More_Horiz</span>
        </button>
        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
        >
          <button
            @click.stop="handleDeletePost"
            class="w-full text-left px-4 py-2 text-sm text-ribbook-red hover:bg-bg-light"
          >
            Post verwijderen
          </button>
        </div>
      </div>
    </header>

    <!-- post text -->
    <article
      class="w-full px-3 py-[5px] flex flex-col items-center gap-[13px] overflow-hidden"
      @click="goToPost"
    >
      <p class="w-full text-black text-base font-normal font-roboto">
        {{ post.postText }}
      </p>
    </article>

    <!--    footer met knoppen-->
    <footer class="w-full px-6 py-1 flex justify-between items-center">
      <!-- comments -->
      <button
        @click="goToPost"
        class="w-20 h-10 rounded-full flex items-center justify-center gap-1 hover:bg-bg-light transition-all duration-200 ease-in-out"
      >
        <span class="icon icon-gray">Chat_Bubble</span>
        <span class="text-comment-stats">
          {{ post.commentCount }}
        </span>
      </button>

      <!-- likes-->
      <button
        class="w-20 h-10 rounded-full flex items-center justify-center gap-1 hover:bg-bg-light transition-all duration-200 ease-in-out"
        @click="$emit('toggle-like', post.docID)"
      >
        <span
          class="icon"
          :class="post.liked ? 'text-ribbook-yellow icon-600' : 'icon-gray icon-400'"
          >Handshake</span
        >
        <span
          class="text-comment-stats"
          :class="post.liked ? 'text-ribbook-yellow font-bold' : 'text-text-muted font-normal'"
        >
          {{ post.likeCount }}
        </span>
      </button>
      <!--      dislikes -->
      <button
        class="w-20 h-10 rounded-full flex items-center justify-center gap-1 hover:bg-bg-light transition-all duration-200 ease-in-out"
        @click="$emit('toggle-dislike', post.docID)"
      >
        <span
          class="icon"
          :class="post.disliked ? 'text-ribbook-red icon-600' : 'icon-gray icon-400'"
          >Gavel</span
        >
        <span
          class="text-comment-stats"
          :class="post.disliked ? 'text-ribbook-red font-bold' : 'text-text-muted font-normal'"
        >
          {{ post.dislikeCount }}
        </span>
      </button>
    </footer>
  </section>
</template>
