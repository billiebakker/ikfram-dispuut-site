import { defineStore } from 'pinia'
import { db, eventCollection } from '@/includes/firebase'
import { doc, getDoc, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'

export default defineStore('events', {
  state: () => ({
    events: [],
    lastDoc: null,
    noMoreEvents: false,
    pendingRequest: false,
    maxEventsPerPage: 4,
  }),
  actions: {
    async fetchEvents() {
      if (this.pendingRequest || this.noMoreEvents) return
      this.pendingRequest = true

      // const uid = useUserStore().currentUser?.uid || null

      const q = this.lastDoc
        ? query(
            eventCollection,
            orderBy('datePosted', 'desc'),
            startAfter(this.lastDoc),
            limit(this.maxEventsPerPage),
          )
        : query(eventCollection, orderBy('datePosted', 'desc'), limit(this.maxEventsPerPage))

      const snapshot = await getDocs(q)

      if (!snapshot.empty) {
        const events = snapshot.docs.map((docSnap) => {
          const data = docSnap.data()
          return {
            docID: docSnap.id,
            ...data,
          }
        })

        // nieuwe events aan lijst toevoegen
        events.forEach((event) => {
          if (!this.events.some((p) => p.docID === event.docID)) {
            this.events.push(event)
          }
        })

        // laatste doc updaten voor 'pages'
        this.lastDoc = snapshot.docs[snapshot.docs.length - 1]
      } else {
        this.noMoreEvents = true
      }

      this.pendingRequest = false
    },

    async fetchEventById(id) {
      // const uid = useUserStore().currentUser?.uid || null

      const cached = this.events.find((p) => p.docID === id)
      if (cached) return cached

      const snap = await getDoc(doc(db, 'events', id))
      if (!snap.exists()) return null

      const data = snap.data()
      const event = {
        docID: snap.id,
        ...data,
      }

      this.events.push(event)
      return event
    },

    async refreshEvents() {
      await this.resetEvents()
      await this.fetchEvents()
    },

    async resetEvents() {
      this.events = []
      this.lastDoc = null
      this.noMoreEvents = false
    },
  },
})
