import { defineStore } from 'pinia'
import { auth, db } from '@/includes/firebase.js'
import usePostsStore from '@/stores/posts'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    authReady: false,
    currentUser: null,
  }),
  actions: {
    async register(values) {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)

      // geeft uid mee om hetzelfde te houden in store en auth
      const newDocument = doc(db, 'users', userCred.user.uid)

      await setDoc(newDocument, {
        name: values.name,
        email: values.email,
      })

      await updateProfile(userCred.user, {
        userDisplayName: values.name,
      })

      this.currentUser = userCred.user
      this.userLoggedIn = true
    },

    async authenticate(values) {
      const userCred = await signInWithEmailAndPassword(auth, values.email, values.password)
      this.currentUser = userCred.user
      this.userLoggedIn = true
    },

    async logout() {
      await auth.signOut()
      this.currentUser = null
      this.userLoggedIn = false
      await usePostsStore().resetPosts()
    },

    initAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.currentUser = user
          this.userLoggedIn = !!user
          this.authReady = true
          resolve()
        })
      })
    },
  },
})
