import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// check de firebase console voor deze config
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  // messagingSenderId: '',
  appId: '',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

// const userCollection = collection(db, 'users')
const postCollection = collection(db, 'posts')
const eventCollection = collection(db, 'events')

export { auth, db, storage, postCollection, eventCollection }
