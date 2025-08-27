import { defineStore } from 'pinia'
import { auth, db } from '@/includes/firebase.js'
import usePostsStore from '@/stores/posts'
import useEventsStore from '@/stores/events'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    authReady: false,
    currentUser: null,
    userProfile: null,
  }),
  actions: {
    async loadUserProfile(uid) {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        this.userProfile = userDoc.data()
      }
    },
    async updateUserProfile(updates) {
      if (!this.currentUser) return
      const user = this.currentUser

      await updateProfile(user, {
        ...(updates.displayName && { displayName: updates.displayName }),
        ...(updates.photoURL && { photoURL: updates.photoURL }),
      })

      // ook doc updaten
      const userDoc = doc(db, 'users', user.uid)
      await updateDoc(userDoc, updates)

      await reload(user)

      await this.loadUserProfile(user.uid)
    },
    async register(values) {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const uid = userCred.user.uid

      // geeft uid mee om hetzelfde te houden in store en auth
      const newDocument = doc(db, 'users', uid)

      await setDoc(newDocument, {
        name: values.name,
        displayName: values.name,
        role: 'kameraad',
        email: values.email,
      })

      await updateProfile(userCred.user, {
        displayName: values.name,
      })

      this.currentUser = userCred.user
      this.userLoggedIn = true
      await this.loadUserProfile(uid)
    },

    async authenticate(values) {
      const userCred = await signInWithEmailAndPassword(auth, values.email, values.password)
      this.currentUser = userCred.user
      this.userLoggedIn = true
      await this.loadUserProfile(userCred.user.uid)
    },

    async logout() {
      await auth.signOut()
      this.currentUser = null
      this.userLoggedIn = false
      this.userProfile = null
      await usePostsStore().resetPosts()
      await useEventsStore().resetEvents()
    },

    initAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          this.currentUser = user
          this.userLoggedIn = !!user
          this.authReady = true
          if (user) {
            await this.loadUserProfile(user.uid)
          } else {
            this.userProfile = null
          }
          resolve()
        })
      })
    },
  },
})
