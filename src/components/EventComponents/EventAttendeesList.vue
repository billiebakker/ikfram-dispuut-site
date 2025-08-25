<script>
export default {
  name: 'EventAttendeesList',
  props: {
    event: Object,
  },
  computed: {
    attendees() {
      if (!this.event.signUps) return []
      return Object.entries(this.event.signUps).map(([uid, attendee]) => ({
        uid,
        ...attendee,
      }))
    },
    foodLabels() {
      return {
        no_food_choice: 'geen',
        veg_choice: 'veg',
        meat_choice: 'vlees',
      }
    },
    totals() {
      const foodTotals = {}
      const drinkTotals = {}

      this.attendees.forEach(({ foodChoice, drinkChoice }) => {
        if (foodChoice) {
          const label = this.foodLabels[foodChoice] || foodChoice
          foodTotals[label] = (foodTotals[label] || 0) + 1
        }
        if (drinkChoice) {
          drinkTotals[drinkChoice] = (drinkTotals[drinkChoice] || 0) + 1
        }
      })

      return { foodTotals, drinkTotals }
    },
  },
  methods: {
    foodLabel(choice) {
      return this.foodLabels[choice] || choice
    },
  },
}
</script>

<template>
  <div @click="$emit('close')" class="fixed w-full h-full flex items-center justify-center z-50">
    <div
      @click.stop
      class="p-2 mx-4 w-full max-w-3xl rounded-xl bg-white border-5 border-ribbook-pink h-full overflow-y-scroll"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold mb-4">{{ event.title }}</h2>
        <button
          @click="$emit('close')"
          class="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-ribbook-pink"
        >
          <span class="icon icon-40 icon-close">Close</span>
        </button>
      </div>

      <template v-if="!this.attendees">
        <!--  totalen-->
        <div class="mb-6">
          <h3 class="font-semibold mb-2">overzichtje</h3>
          <div class="flex flex-col gap-1 text-sm">
            <div v-if="event.foodOption !== 'no_food'">
              <span class="font-medium">Eten:</span>
              <span v-for="(count, choice) in totals.foodTotals" :key="choice" class="ml-2">
                {{ choice }}: {{ count }},
              </span>
            </div>
            <div>
              <span class="font-medium">Drinken:</span>
              <span v-for="(count, choice) in totals.drinkTotals" :key="choice" class="ml-2">
                {{ choice }}: {{ count }},
              </span>
            </div>
          </div>
        </div>

        <!--      alle aanmeldingen en details-->
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-3 py-2 border-b">naam</th>
              <th v-if="event.foodOption !== 'no_food'" class="px-3 py-2 border-b">eten</th>
              <th class="px-3 py-2 border-b">drinken</th>
              <th v-if="event.foodOption !== 'no_food'" class="px-3 py-2 border-b">allergieën</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attendee in attendees" :key="attendee.uid" class="hover:bg-gray-50">
              <td class="px-3 py-2 border-b">{{ attendee.displayName }}</td>
              <td v-if="event.foodOption !== 'no_food'" class="px-3 py-2 border-b">
                {{ foodLabel(attendee.foodChoice) || '-' }}
              </td>
              <td class="px-3 py-2 border-b">{{ attendee.drinkChoice || '-' }}</td>
              <td v-if="event.foodOption !== 'no_food'" class="px-3 py-2 border-b">
                {{ attendee.allergies || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <div v-else>Geen aanmeldingen</div>
    </div>
  </div>
</template>
