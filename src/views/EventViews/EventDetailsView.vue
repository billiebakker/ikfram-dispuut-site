<script>
import useEventsStore from '@/stores/events'

export default {
  name: 'EventDetailsView',
  data() {
    return {
      event: null,
      pendingRequest: true,
      error: null,
    }
  },
  async created() {
    await useEventsStore()
      .fetchEventById(this.$route.params.id)
      .then((event) => {
        this.event = event
        this.pendingRequest = false
      })
  },
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div v-if="pendingRequest" class="py-8 text-gray-600">Aan het laden...</div>
    <div v-else-if="error" class="py-8 text-red-500">{{ error }}</div>
    <!--    todo betere error handling en error message (component?)-->
    <div v-else class="flex-1 min-h-0 overflow-auto">
      <div class="sticky top-0 z-0">
        <img
          v-if="event.headerImage"
          :src="event.headerImage"
          alt=""
          class="w-full h-[222px] object-cover"
        />
        <!--        todo als geen image-->
        <!-- <div v-else class="w-full h-[222px] bg-gray-200"></div> -->
      </div>

      <div class="px-2">
        <!-- Card that overlaps the hero -->
        <div
          class="relative z-10 -mt-6 w-full max-w-2xl mx-auto p-4 bg-white rounded-xl outline outline-3 outline-ribbook-red flex flex-col gap-3"
        >
          <!-- datum, over x dagen -->
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div class="flex items-center gap-2">
              <span class="icon icon-gray icon-filled">Calendar_Month</span>
              <p class="text-main-medium-gray text-sm font-normal font-roboto">
                {{
                  new Date(event.date).toLocaleDateString('nl-NL', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })
                }}, om
                {{
                  new Date(event.date).toLocaleTimeString('nl-NL', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
              </p>
            </div>
            <timeago
              class="text-ribbook-red text-sm font-semibold font-roboto"
              :datetime="event.date"
            />
          </div>

          <!-- titel -->
          <h1 class="text-2xl font-semibold font-roboto">
            {{ event.title }}
          </h1>

          <div class="border-t border-gray-300" />

          <!-- locatie, aantal ingeschreven -->
          <div
            class="flex flex-wrap gap-3 justify-between items-center text-sm text-ribbook-dark-gray"
          >
            <div class="flex items-center gap-2">
              <span class="icon icon-gray">Location_On</span>
              <span>{{ event.location || 'geen locatie' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="icon icon-gray icon-filled">Group</span>
              <span>{{ event.attendeeCount }} aanmeldingen</span>
            </div>
          </div>

          <div class="border-t border-gray-300"></div>

          <!-- beschrijving -->
          <div class="flex flex-col gap-3">
            <p class="font-roboto">
              {{ event.description }}
            </p>
            <p class="text-gray-600 text-sm font-normal font-roboto">
              Geplaatst door {{ event.userDisplayName || 'onbekend' }} op
              {{
                new Date(event.datePosted).toLocaleDateString('nl-NL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }},
              {{
                new Date(event.datePosted).toLocaleTimeString('nl-NL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }}
            </p>
          </div>
        </div>
      </div>
      <!-- /page padding -->
    </div>
    <!-- /scroll container -->
  </div>
</template>
