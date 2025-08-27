<script>
import useEventsStore from '@/stores/events.js'

export default {
  name: 'EventSignUpButton',
  props: {
    event: Object,
  },
  data() {
    return {
      isSignedUp: false,
      pendingRequest: true,
    }
  },
  computed: {
    deadlineHasPassed() {
      return new Date(this.event.signupDeadline) < new Date()
    },
    buttonColor() {
      if (this.deadlineHasPassed) return 'bg-gray-400 cursor-not-allowed'
      return this.isSignedUp ? 'bg-green-700 hover:bg-green-600' : 'bg-ribbook-red hover:bg-red-400'
    },
    buttonText() {
      if (this.isSignedUp && !this.deadlineHasPassed)
        return {
          top: 'Je bent aangemeld :) Aanpassen of afmelden?',
          bottom: 'Kan nog tot',
          showTime: true,
        }
      else if (this.isSignedUp && this.deadlineHasPassed)
        return {
          top: 'Je bent aangemeld!',
          bottom: 'Je kan niet meer aanpassen, inschrijving is gesloten.',
          showTime: false,
        }
      else if (!this.isSignedUp && !this.deadlineHasPassed)
        return {
          top: 'AANMELDEN!!',
          bottom: 'Aanmelding sluit',
          showTime: true,
        }
      else if (!this.isSignedUp && this.deadlineHasPassed)
        return {
          top: 'Aanmelding is gesloten :(',
          bottom: 'jammerdebammer',
          showTime: false,
        }
      else return { top: 'huh', bottom: 'idk', showTime: false }
    },
  },
  async created() {
    this.pendingRequest = true
    this.isSignedUp = await useEventsStore().userAlreadySignedUp(this.event)
    this.pendingRequest = false
  },
}
</script>

<template>
  <div class="mx-auto">
    <button
      v-if="!pendingRequest"
      :disabled="deadlineHasPassed"
      class="flex-col mx-2 max-w-2xl transition-all duration-200 ease-in-out px-5 py-2 border-2 border-ribbook-yellow rounded-lg flex justify-between items-center"
      :class="buttonColor"
      @click="$router.push({ name: 'event-signup', params: { id: event.docID } })"
    >
      <span class="text-ribbook-yellow text-lg font-semibold">{{ buttonText.top }}</span>
      <span class="text-sm text-ribbook-yellow"
        >{{ buttonText.bottom }}
        <!--        <template v-if="buttonText.showTime">-->
        <!--          {{-->
        <!--            new Date(event.signupDeadline).toLocaleTimeString('nl-NL', {-->
        <!--              day: '2-digit',-->
        <!--              hour: '2-digit',-->
        <!--              minute: '2-digit',-->
        <!--            })-->
        <!--          }}</template-->
        <!--        >-->
        <timeago
          v-if="buttonText.showTime"
          class="font-semibold"
          :datetime="event.signupDeadline"
        />
      </span>
    </button>
    <div v-else>een momentje....</div>
  </div>
</template>
