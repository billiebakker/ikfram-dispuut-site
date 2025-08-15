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
          'Hallo, ben je bestuur? Klik weg! Hang op! Bel je bank! Ben je geen bestuur, welkn' +
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
    <EventItem :event="event" />
  </div>
</template>
