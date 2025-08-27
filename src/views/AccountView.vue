<script>
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import useUserStore from '@/stores/user'
import { updateProfile } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/includes/firebase.js'
import { ErrorMessage, Field as VeeField, Form as VeeForm } from 'vee-validate'
import imageCompression from 'browser-image-compression'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default defineComponent({
  name: 'AccountView',
  components: {
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
  async mounted() {
    const user = useUserStore().currentUser

    const userDoc = await getDoc(doc(db, 'users', user.uid))
    const data = userDoc.data()
    console.log(data)
    this.initialValues = {
      displayName: data.displayName, //|| user.displayName || '',
      allergies: data.allergies || '',
    }
  },

  methods: {
    async submitAccount(values) {
      try {
        this.account_in_submission = true
        this.account_show_alert = true
        this.account_alert_variant = 'bg-blue-800'
        this.account_alert_msg = 'ok wacht even...'

        const user = useUserStore().currentUser

        // update Firebase Auth profile
        await updateProfile(user, {
          displayName: values.displayName,
          // photoURL: this.imageUpload?.url || user.photoURL,
        })

        // update Firestore doc
        const userDoc = doc(db, 'users', user.uid)
        await updateDoc(userDoc, {
          displayName: values.displayName,
          allergies: values.allergies || '',
          // photoURL: this.imageUpload?.url || user.photoURL || '',
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
      this.account_in_submission = true
      this.account_show_alert = true
      this.account_alert_variant = 'bg-blue-800'
      this.account_alert_msg = 'ok even wachten...'

      const file = event.target.files[0]
      if (!file) return
      if (!file.type.startsWith('image/')) {
        this.account_alert_msg = 'Alleen afbeeldingen zijn toegestaan!'
        this.account_alert_variant = 'bg-red-800'
        this.account_in_submission = false
        return
      }

      try {
        this.account_alert_msg = 'ff foto kleiner maken...'

        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 720,
          useWebWorker: true,
        })

        this.account_alert_msg = 'foto aan het uploaden...'

        const user = useUserStore().currentUser
        const imgRef = ref(storage, `profile-pictures/${user.uid}_${Date.now()}.jpg`)
        await uploadBytes(imgRef, compressedFile)

        const url = await getDownloadURL(imgRef)

        this.imageUpload = {
          url,
          file: compressedFile,
          status: 'done',
        }
        await this.submitProfilePicture()
      } catch (err) {
        console.error('Image upload failed:', err)
        this.imageUpload = { status: 'error' }
      }
    },
    async submitProfilePicture() {
      try {
        this.account_in_submission = true
        this.account_show_alert = true
        this.account_alert_variant = 'bg-blue-800'
        this.account_alert_msg = 'foto vastmaken aan profiel...'
        const user = useUserStore().currentUser

        // update Firebase Auth profile
        await updateProfile(user, {
          // displayName: values.displayName,
          photoURL: this.imageUpload?.url || user.photoURL,
        })

        // update Firestore doc
        const userDoc = doc(db, 'users', user.uid)
        await updateDoc(userDoc, {
          // displayName: values.displayName,
          // allergies: values.allergies || '',
          photoURL: this.imageUpload?.url || user.photoURL || '',
        })

        // update local store
        this.userStore.currentUser = {
          ...user,
          // displayName: values.displayName,
          photoURL: this.imageUpload?.url || user.photoURL,
        }

        this.account_in_submission = false
        this.account_alert_variant = 'bg-green-800'
        this.account_alert_msg = 'foto opgeslagen!'
      } catch (err) {
        console.error(err)
        this.account_in_submission = false
        this.account_alert_variant = 'bg-red-800'
        this.account_alert_msg = 'oei, wat fout gegaan :( probeer opnieuw aub?'
      }
    },
  },
})
</script>

<template>
  <section
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-auto"
  >
    <div
      class="max-w-xl p-3 w-full py-1 bg-white rounded-lg outline outline-3 outline-ribbook-yellow flex flex-col items-center gap-4"
    >
      <!-- header user info -->
      <div class="flex flex-col items-center gap-2">
        <div class="hover:cursor-pointer hover:opacity-70 bg-ribbook-pink rounded-full">
          <img
            v-if="imageUpload?.url || userStore.currentUser?.photoURL"
            :src="imageUpload?.url || userStore.currentUser?.photoURL"
            alt="Profielfoto"
            class="w-24 h-24 rounded-full object-cover border-2 border-ribbook-pink"
            @click="$refs.imageUpload.click()"
          />
          <div
            v-else
            class="w-24 h-24 bg-ribbook-pink rounded-full"
            @click="$refs.imageUpload.click()"
          />
        </div>
        <input
          ref="imageUpload"
          type="file"
          accept="image/*"
          class="hidden"
          @change="uploadProfilePicture($event)"
        />
        <p class="text-lg font-semibold font-roboto text-text-muted">
          {{ userStore.currentUser?.name || userStore.currentUser?.displayName || 'Naam onbekend' }}
        </p>
      </div>

      <!-- profiel form -->
      <vee-form
        @submit="submitAccount"
        @keydown.enter.prevent
        :validation-schema="accountSchema"
        :enable-initial-values="true"
        :initial-values="initialValues"
        class="w-full flex-1 flex flex-col gap-2.5"
      >
        <!-- displayName -->
        <div>
          <label class="block mb-1 font-medium">Voornaam (of bijnaam)</label>
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
  </section>
</template>
