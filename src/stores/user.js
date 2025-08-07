import { defineStore } from 'pinia'
import { auth, db } from '@/includes/firebase.js'
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
        displayName: values.name,
      })

      this.userLoggedIn = true
    },

    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      this.userLoggedIn = true
    },

    async logout() {
      await auth.signOut()
      this.userLoggedIn = false
    },

    initAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.userLoggedIn = !!user
          this.authReady = true
          resolve()
        })
      })
    },
  },
})
