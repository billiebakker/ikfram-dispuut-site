<script>
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import useUserStore from '@/stores/user'
import { storage } from '@/includes/firebase.js'
import { ErrorMessage, Field as VeeField, Form as VeeForm } from 'vee-validate'
import imageCompression from 'browser-image-compression'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import ProfilePicture from '@/components/common/ProfilePicture.vue'

export default defineComponent({
  name: 'AccountView',
  components: {
    ProfilePicture,
    VeeForm,
    VeeField,
    ErrorMessage,
  },
  computed: {
    // zodat ik het kan aanroepen in de template
    ...mapStores(useUserStore),
  },
  data() {
    return {
      imageUpload: null,
      initialValues: {
        displayName: '',
        allergies: '',
      },
      accountSchema: {
        displayName: 'required|min:1|max:80',
        allergies: 'max:100|alpha_spaces',
      },

      account_in_submission: false,
      account_show_alert: false,
      account_alert_variant: 'bg-blue-800',
      account_alert_msg: 'even wachten...',
    }
  },

  methods: {
    async logout() {
      await useUserStore().logout()
      this.$router.push({ name: 'login' })
    },
    async submitAccount(values) {
      try {
        this.account_in_submission = true
        this.account_show_alert = true
        this.account_alert_variant = 'bg-blue-800'
        this.account_alert_msg = 'ok wacht even...'

        await this.userStore.updateUserProfile({
          displayName: values.displayName,
          allergies: values.allergies || '',
        })

        this.account_in_submission = false
        this.account_alert_variant = 'bg-green-800'
        this.account_alert_msg = 'Profiel succesvol opgeslagen!'
      } catch (err) {
        console.error(err)
        this.account_in_submission = false
        this.account_alert_variant = 'bg-red-800'
        this.account_alert_msg = 'oei, wat fout gegaan :( probeer opnieuw aub?'
      }
    },
    async uploadProfilePicture(event) {
      const file = event.target.files[0]
      if (!file) return
      if (!file.type.startsWith('image/')) {
        this.account_alert_msg = 'Alleen afbeeldingen zijn toegestaan!'
        this.account_alert_variant = 'bg-red-800'
        return
      }

      try {
        this.account_in_submission = true
        this.account_show_alert = true
        this.account_alert_variant = 'bg-blue-800'
        this.account_alert_msg = 'ff foto kleiner maken...'

        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 200,
          useWebWorker: true,
        })

        this.account_alert_msg = 'foto aan het uploaden...'

        const user = this.userStore.currentUser
        const imgRef = ref(storage, `profile-pictures/${user.uid}_${Date.now()}.jpg`)
        await uploadBytes(imgRef, compressedFile)

        const url = await getDownloadURL(imgRef)

        // ✅ immediately save to Firebase/Auth/Firestore via store
        await this.userStore.updateUserProfile({ photoURL: url })

        // show preview
        this.imageUpload = {
          url,
          file: compressedFile,
          status: 'done',
        }

        this.account_in_submission = false
        this.account_alert_variant = 'bg-green-800'
        this.account_alert_msg = 'foto opgeslagen!'
      } catch (err) {
        console.error('Image upload failed:', err)
        this.account_in_submission = false
        this.account_alert_variant = 'bg-red-800'
        this.account_alert_msg = 'oei, upload mislukt :('
        this.imageUpload = { status: 'error' }
      }
    },
  },
})
</script>

<template>
  <section
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-6 overflow-auto"
  >
    <div
      class="max-w-xl p-6 py-4 w-full bg-white rounded-lg outline outline-3 outline-ribbook-yellow flex flex-wrap justify-center items-center gap-8"
    >
      <!-- header user info -->
      <div class="flex flex-col items-center gap-2">
        <ProfilePicture
          :userPhotoURL="userStore.userProfile?.photoURL"
          big
          class="hover:cursor-pointer hover:opacity-70"
          @click="$refs.imageUpload.click()"
        />
        <input
          ref="imageUpload"
          type="file"
          accept="image/*"
          class="hidden"
          @change="uploadProfilePicture($event)"
        />
        <p class="text-lg font-semibold font-roboto text-text-muted">
          {{ userStore.userProfile?.displayName || '' }}
        </p>
      </div>

      <!-- profiel form -->
      <vee-form
        :key="userStore.userProfile?.displayName"
        @submit="submitAccount"
        @keydown.enter.prevent
        :validation-schema="accountSchema"
        :enable-initial-values="true"
        :initial-values="{
          displayName: userStore.userProfile?.displayName || '',
          allergies: userStore.userProfile?.allergies || '',
        }"
        class="w-full min-w-[230px] flex-1 flex flex-col gap-2.5"
      >
        <!-- displayName -->
        <div>
          <label class="block mb-1 font-medium">Voornaam (of bijnaam) aanpassen</label>
          <vee-field
            name="displayName"
            placeholder="naam die op posts verschijnt"
            class="w-full px-3 py-2 text-text-muted bg-bg-light rounded-lg text-base font-normal font-roboto focus:outline-none"
          />
          <ErrorMessage name="displayName" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <!-- allergieen -->
        <div>
          <label class="block mb-1 font-medium">Allergieën</label>
          <vee-field
            name="allergies"
            placeholder="pinda's of gluten of schaaldieren ofzo"
            class="w-full px-3 py-2 text-text-muted bg-bg-light rounded-lg text-base font-normal font-roboto focus:outline-none"
          />
          <ErrorMessage name="allergies" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <button
          type="submit"
          class="px-2.5 my-1 h-10 bg-ribbook-red rounded-lg flex items-center gap-3 justify-center cursor-pointer"
        >
          <span class="text-sm font-semibold font-roboto text-ribbook-yellow">Opslaan</span>
        </button>
      </vee-form>
      <div
        v-show="account_show_alert"
        class="w-full px-1.5 flex gap-2.5 rounded-md text-white"
        :class="account_alert_variant"
      >
        {{ account_alert_msg }}
      </div>
    </div>

    <div
      class="max-w-xl p-6 py-4 w-full bg-white rounded-lg outline outline-3 outline-ribbook-yellow flex flex-wrap justify-center items-center gap-8"
    >
      <button
        @click="logout"
        class="px-4 my-1 h-10 bg-ribbook-red rounded-lg flex items-center gap-3 justify-center cursor-pointer"
      >
        <span class="text-sm font-semibold font-roboto text-ribbook-yellow">uitloggen</span>
      </button>
      <div class="flex flex-col gap-1">
        <p class="w-full">
          Jouw rol: <span class="font-semibold">{{ userStore.userProfile?.role }} </span>
        </p>
        <p class="w-full">
          Jouw email: <span class="font-semibold"> {{ userStore.currentUser?.email }} </span>
        </p>
        <p class="text-text-muted">
          Vraag een admin (bestuur of techsub) om deze dingen aan te passen of om je account te
          verwijderen
        </p>
      </div>
    </div>
  </section>
</template>
