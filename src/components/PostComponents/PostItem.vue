<script>
import router from '@/router/index.js'
import ProfilePicture from '@/components/common/ProfilePicture.vue'

export default {
  name: 'PostItem',
  components: { ProfilePicture },
  props: {
    post: Object,
  },
  emits: ['toggle-like', 'toggle-dislike'],
  methods: {
    goToPost() {
      router.push({ name: 'post-detail', params: { id: this.post.docID } })
    },
  },
}
</script>

<template>
  <section
    class="max-w-[480px] w-full bg-white rounded-xl outline outline-3 outline-ribbook-yellow flex flex-col items-center gap-2.5"
  >
    <!--    pf, naam, tijd-->
    <header class="w-full flex flex-col items-center gap-1" @click="goToPost">
      <div class="w-full h-14 pl-1.5 pr-[22px] flex items-center gap-1 overflow-hidden">
        <ProfilePicture :userPhotoURL="post.userPhotoURL" />
        <div class="px-[9px] flex items-center gap-6 overflow-hidden">
          <h2 class="text-black text-base font-semibold font-roboto">
            {{ post.userDisplayName || 'Onbekend' }}
          </h2>
          <p class="text-text-muted text-sm font-normal font-roboto">
            <timeago :datetime="post.datePosted" />
          </p>
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
