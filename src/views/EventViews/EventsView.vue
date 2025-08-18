<script>
import { defineComponent } from 'vue'
import EventItem from '@/components/EventComponents/EventItem.vue'

export default defineComponent({
  name: 'EventsView',
  components: { EventItem },
  data() {
    return {
      event: {
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        signupDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),

        authorDisplayName: 'Onbekend',
        datePosted: new Date().toISOString(),
        description:
          'Hallo, ben je bestuur? Klik weg! Hang op! Bel je bank! Ben je geen bestuur, welkom  ' +
          'rredacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted redacted edacted ',

        title: 'Activiteit naaaaaaaaaaaaaaaaaaaaam',
        headerImage: 'https://placehold.co/484x123',

        commentCount: 0,
        attendeeCount: 34,
      },
    }
  },
})
</script>

<template>
  <div
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-auto"
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

    <EventItem :event="event" />
  </div>
</template>
