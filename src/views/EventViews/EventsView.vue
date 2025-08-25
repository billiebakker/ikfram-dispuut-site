<script>
import { defineComponent } from 'vue'
import EventItem from '@/components/EventComponents/EventItem.vue'
import useEventsStore from '@/stores/events'

export default defineComponent({
  name: 'EventsView',
  components: { EventItem },
  data() {
    return {
      scrollParent: null,
      scrollHandler: null,
    }
  },
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
    archiveActive() {
      return useEventsStore().showArchive
    },
    sortAscending() {
      return useEventsStore().sortAscending
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
    toggleArchive() {
      useEventsStore().toggleArchive()
    },
    toggleSort() {
      useEventsStore().toggleSort()
    },
    // ja vibe code helaas, scrolling lastig
    getClosestScrollableParent(node) {
      let el = node && node.nodeType === 1 ? node.parentElement : null
      while (el && el !== document.body) {
        const style = getComputedStyle(el)
        const oy = style.overflowY
        if (oy === 'auto' || oy === 'scroll' || oy === 'overlay') return el
        el = el.parentElement
      }
      return window // fallback to page scrolling
    },
    checkAndLoadMore() {
      const el =
        this.scrollParent === window
          ? document.scrollingElement || document.documentElement
          : this.scrollParent

      if (!el) return
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100

      if (nearBottom) this.getEvents()
    },
  },
  async created() {
    await this.getEvents()
  },
  mounted() {
    this.scrollParent = this.getClosestScrollableParent(this.$el)

    // single handler reference for add/remove
    this.scrollHandler = () => this.checkAndLoadMore()

    if (this.scrollParent === window) {
      window.addEventListener('scroll', this.scrollHandler, { passive: true })
    } else if (this.scrollParent) {
      this.scrollParent.addEventListener('scroll', this.scrollHandler, { passive: true })
    }

    // run once in case we mount already near the bottom
    this.$nextTick(() => this.checkAndLoadMore())
  },
  beforeUnmount() {
    if (this.scrollParent === window) {
      window.removeEventListener('scroll', this.scrollHandler)
    } else if (this.scrollParent) {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler)
    }
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
      <button
        @click="toggleSort"
        class="flex gap-1 p-2 pr-3 justify-center items-center bg-ribbook-red rounded-lg hover:bg-white/20 cursor-pointer"
      >
        <span class="icon icon-yellow">{{
          this.sortAscending ? 'Arrow_Upward' : 'Arrow_Downward'
        }}</span>
        <span class="text-sm font-semibold font-roboto text-ribbook-yellow">Eerstvolgende</span>
      </button>
      <router-link
        :to="{ name: 'create-event' }"
        class="flex gap-1 p-2 justify-center items-center bg-ribbook-red rounded-lg hover:bg-white/20"
      >
        <span class="icon icon-yellow">Add_Ad</span>
        <span class="text-sm font-semibold font-roboto text-ribbook-yellow">Nieuw</span>
      </router-link>
      <button
        @click="toggleArchive"
        class="flex gap-1 p-2 pr-2.5 justify-left items-center bg-ribbook-red rounded-lg hover:bg-white/20 cursor-pointer"
        :class="this.archiveActive ? 'bg-white/30' : ''"
      >
        <span class="icon icon-yellow">{{ this.archiveActive ? 'History_Off' : 'History' }}</span>
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
