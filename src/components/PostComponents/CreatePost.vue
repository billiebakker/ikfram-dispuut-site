<script>
import { addDoc } from 'firebase/firestore'
import { auth, postCollection } from '@/includes/firebase.js'
import { ErrorMessage } from 'vee-validate'

export default {
  name: 'CreatePost',
  components: { ErrorMessage },
  emits: ['newPostSubmitted'],
  data() {
    return {
      postSchema: {
        postText: 'min:2|max:400',
      },
      post_in_submission: false,
      post_show_alert: false,
      post_alert_variant: 'bg-blue-800',
      post_alert_msg: 'even wachten...',
    }
  },
  methods: {
    autoResize(e) {
      const textarea = e.target
      textarea.style.height = 'auto' // eerst resetten
      textarea.style.height = textarea.scrollHeight + 'px'
    },

    async submitPost(values, { resetForm }) {
      this.post_in_submission = true
      this.post_show_alert = true
      this.post_alert_variant = 'bg-ribbook-pink'
      this.post_alert_msg = 'ok wacht even...'

      const post = {
        postText: values.postText,
        datePosted: new Date().toISOString(),
        uid: auth.currentUser.uid,
        userDisplayName: auth.currentUser.displayName,
        commentCount: 0,
        likeCount: 0,
        dislikeCount: 0,
      }

      //   toevoegen aan db
      await addDoc(postCollection, post)

      this.post_in_submission = false
      this.post_alert_variant = 'bg-green-500'
      this.post_alert_msg = 'yay gepost!'

      resetForm()
      this.$emit('newPostSubmitted')
    },
  },
}
</script>

<template>
  <section
    class="max-w-[480px] w-full py-[5px] bg-white rounded-[13px] outline outline-[3px] outline-ribbook-yellow flex flex-col items-center gap-2.5"
  >
    <div class="mt-0.5 w-full px-1.5 flex gap-2.5">
      <!--      pf-->
      <div class="py-1">
        <!--        TODO replace with pf-->
        <div class="w-[46px] h-[46px] bg-ribbook-pink rounded-full"></div>
      </div>

      <!--      input -->
      <vee-form @submit="submitPost" :validation-schema="postSchema" class="flex-1 flex">
        <div class="w-full">
          <vee-field
            as="textarea"
            name="postText"
            placeholder="max 400 tekens...."
            class="w-full resize-none px-3 py-2 text-text-muted bg-bg-light rounded-[12px] text-base font-normal font-roboto focus:outline-none"
            @input="autoResize"
          ></vee-field>
          <ErrorMessage name="postText" class="text-ribbook-red text-sm mt-1 block" />
          <div
            v-show="post_show_alert"
            class="w-full px-1.5 flex gap-2.5 rounded-md"
            :class="post_alert_variant"
          >
            {{ post_alert_msg }}
          </div>
        </div>
        <button
          type="submit"
          class="px-2.5 ml-1.5 mt-0 py-0.5 h-10 bg-ribbook-red rounded-[9px] flex items-center gap-[9px] overflow-hidden"
        >
          <span class="icon icon-yellow">Send</span>
        </button>
      </vee-form>
    </div>

    <!-- Post options -->
    <!--    todo link options: foto toevoegen, link, tags.
    zie post item button styling-->
    <!--    <div class="w-full px-[52px] py-[3px] flex flex-col items-start gap-[5px]">-->
    <!--      <div class="w-full px-[141px] flex justify-between items-center">-->
    <!--        <div class="flex items-center gap-1 overflow-hidden">-->
    <!--          <span class="text-[&#45;&#45;color-text-muted] text-base font-normal font-roboto">Opties...</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </section>
</template>

<style scoped></style>
