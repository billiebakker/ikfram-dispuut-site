<script>
import router from '@/router/index.js'

export default {
  name: 'EventItem',
  props: {
    event: Object,
  },
  computed: {
    eventDescription() {
      if (this.event.description.length > 180) {
        return this.event.description.slice(0, 180) + '...'
      }
      return this.event.description
    },
  },
  methods: {
    goToEventDetail() {
      router.push({ name: 'event-detail', params: { id: this.event.docID } })
    },
  },
}
</script>

<template>
  <section
    class="max-w-[520px] w-full bg-white rounded-xl outline outline-3 outline-ribbook-yellow flex flex-col items-center"
  >
    <!--    event naam, timeto, sluit over [tijd]-->
    <header class="w-full px-2 py-1.5 inline-flex flex-col items-end gap-1">
      <p class="text-main-medium-gray text-sm font-normal font-roboto">
        <timeago :datetime="event.date" />
      </p>
      <h1 class="text-right font-semibold font-roboto">
        {{ event.title }}
      </h1>
      <p class="text-main-medium-gray text-sm font-normal font-roboto">
        Aanmelding sluit
        <timeago
          :datetime="event.signupDeadline"
          :converter-options="{ includeSeconds: true, useStrict: true }"
        />
      </p>
    </header>

    <!--    header image or divider-->
    <div v-if="!event.headerImage" class="self-stretch h-0 px-2 py-2 inline-flex flex-col gap-2.5">
      <div class="self-stretch h-0 outline outline-1 outline-gray-300" />
    </div>
    <img v-else class="w-[484px] h-[123px]" :src="event.headerImage" alt="" />

    <!-- event description -->
    <article class="w-full px-3 py-2 flex flex-col items-center">
      <p class="w-full text-black text-base font-normal font-roboto">
        {{ eventDescription }}
      </p>
    </article>

    <!--    footer -->
    <footer class="w-full px-5 py-2 flex justify-between items-center">
      <!-- comment count -->
      <div class="flex items-center justify-center gap-1">
        <span class="icon icon-500 icon-gray">Chat_Bubble</span>
        <span class="text-comment-stats">
          {{ event.commentCount }}
        </span>
      </div>

      <!-- calendar, 'over x dagen/uur'-->
      <div class="flex items-center justify-center gap-1">
        <span class="icon icon-gray icon-400">Calendar_Month</span>
        <span class="text-comment-stats text-text-muted font-normal">
          {{
            new Date(event.date).toLocaleDateString('nl-NL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })
          }}
        </span>
      </div>
      <!--      aantal ingeschreven -->
      <div class="flex items-center justify-center gap-1">
        <span class="icon icon-gray icon-400 icon-filled">Group</span>
        <span class="text-comment-stats text-text-muted font-normal">
          {{ event.attendeeCount }}
        </span>
      </div>
    </footer>
  </section>
</template>
