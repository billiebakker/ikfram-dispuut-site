import { defineStore } from 'pinia'
import { db, eventCollection } from '@/includes/firebase'
import { doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'

export default defineStore('events', {
  state: () => ({
    events: [],
    lastDoc: null,
    noMoreEvents: false,
    pendingRequest: false,
    maxEventsPerPage: 4,
    showArchive: false,
    sortAscending: true,
  }),
  actions: {
    signUp(event) {},
    toggleSort() {
      this.sortAscending = !this.sortAscending
      this.refreshEvents()
    },
    async toggleArchive() {
      this.showArchive = !this.showArchive
      await this.refreshEvents()
    },
    async fetchEvents() {
      if (this.pendingRequest || this.noMoreEvents) return
      this.pendingRequest = true

      const now = new Date()
      const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString()

      const sortDirection = this.sortAscending ? 'asc' : 'desc'

      let q

      if (this.showArchive) {
        q = this.lastDoc
          ? query(
              eventCollection,
              orderBy('date', sortDirection),
              startAfter(this.lastDoc),
              where('date', '<', eightHoursAgo), // 👈 only past events
              limit(this.maxEventsPerPage),
            )
          : query(
              eventCollection,
              orderBy('date', sortDirection),
              where('date', '<', eightHoursAgo),
              limit(this.maxEventsPerPage),
            )
      } else {
        q = this.lastDoc
          ? query(
              eventCollection,
              orderBy('date', sortDirection),
              startAfter(this.lastDoc),
              where('date', '>=', eightHoursAgo), // 👈 upcoming + last 8h
              limit(this.maxEventsPerPage),
            )
          : query(
              eventCollection,
              orderBy('date', sortDirection),
              where('date', '>=', eightHoursAgo),
              limit(this.maxEventsPerPage),
            )
      }
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
