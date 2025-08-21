<script>
import { defineComponent } from 'vue'
import EventItem from '@/components/EventComponents/EventItem.vue'
import useEventsStore from '@/stores/events'

export default defineComponent({
  name: 'EventsView',
  components: { EventItem },
  computed: {
    events() {
      return useEventsStore().events
    },
    pendingRequest() {
      return useEventsStore().pendingRequest
    },
    noMoreEvents() {
      return useEventsStore().noMoreEvents
    },
    loadMoreButtonText() {
      if (this.noMoreEvents) return 'dat was het!'
      if (this.pendingRequest) return 'aan het laden...'
      return 'meer laden'
    },
  },
  methods: {
    getEvents() {
      useEventsStore().fetchEvents()
    },
    refreshEvents() {
      useEventsStore().refreshEvents()
    },
    handleScroll(e) {
      const el = e.target
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
        this.getEvents()
      }
    },
  },
  async created() {
    await this.getEvents()
  },
})
</script>

<template>
  <div
    ref="scrollContainer"
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-auto"
    @scroll="handleScroll"
  >
    <!--    knoppen-->
    <section
      class="max-w-[520px] py-3 px-5 w-full rounded-xl outline-ribbook-yellow flex flex-row flex-wrap items-center justify-between gap-2.5"
    >
      <button class="flex gap-1 justify-center items-center bg-ribbook-red rounded-lg">
        <span class="icon icon-yellow">Arrow_Upward</span>
        <span class="text-sm font-semibold font-roboto text-ribbook-yellow">Eerstvolgende</span>
      </button>
      <router-link
        :to="{ name: 'create-event' }"
        class="flex gap-1 justify-center items-center bg-ribbook-red rounded-lg"
      >
        <span class="icon icon-yellow">Add_Ad</span>
        <span class="text-sm font-semibold font-roboto text-ribbook-yellow">Nieuw</span>
      </router-link>
      <button class="flex gap-1 justify-center items-center bg-ribbook-red rounded-lg">
        <span class="icon icon-yellow">History</span>
        <span class="text-sm font-semibold font-roboto text-ribbook-yellow">Archief</span>
      </button>
    </section>

    <EventItem v-for="event in events" :key="event.docID" :event="event" />
    <button
      class="w-[224px] h-[42px] rounded outline outline-2 outline-offset-[-1px] outline-ribbook-yellow text-ribbook-yellow flex justify-center items-center gap-2.5"
      @click="getEvents"
    >
      {{ loadMoreButtonText }}
    </button>
  </div>
</template>
