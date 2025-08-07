import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD904AbSGmQZAU-XVc8gYlKJvfgRM1tqJg',
  authDomain: 'dispuuts-site.firebaseapp.com',
  projectId: 'dispuuts-site',
  storageBucket: 'dispuuts-site.firebasestorage.app',
  // messagingSenderId: '393407453806',
  appId: '1:393407453806:web:caeee640e2033fd145a47f',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const userCollection = collection(db, 'users')
// const postCollection = collection(db, 'posts')

export { auth, db, storage, userCollection }
