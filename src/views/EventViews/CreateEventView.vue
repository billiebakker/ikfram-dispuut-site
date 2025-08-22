<script>
import { ErrorMessage } from 'vee-validate'
import { auth, eventCollection } from '@/includes/firebase.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { addDoc } from 'firebase/firestore'
import useEventsStore from '@/stores/events'

export default {
  name: 'CreateEventView',
  components: { ErrorMessage, VueDatePicker },

  data() {
    return {
      eventSchema: {
        title: 'required|min:3|max:100',
        description: 'required|min:2|max:1200',
        location: 'required|min:2|max:100',
        date: 'required',
        deadlineInHoursToEvent: 'required',
        foodOption: 'required',
      },
      event_in_submission: false,
      event_show_alert: false,
      event_alert_variant: 'bg-blue-800',
      event_alert_msg: 'even wachten...',

      drinkOptions: ['Bier', 'Wijn', 'Fris', 'Cocktail'],
      newDrink: '',
    }
  },
  methods: {
    addDrink() {
      const drink = this.newDrink.trim()
      if (drink && !this.drinkOptions.includes(drink)) {
        this.drinkOptions.push(drink)
        this.newDrink = ''
      }
    },
    autoResize(e) {
      const textarea = e.target
      textarea.style.height = 'auto' // eerst resetten
      textarea.style.height = textarea.scrollHeight + 'px'
    },
    async submitEvent(values) {
      this.event_in_submission = true
      this.event_show_alert = true
      this.event_alert_variant = 'bg-ribbook-pink'
      this.event_alert_msg = 'ok wacht even...'

      const signupDeadline = new Date(
        values.date.getTime() - values.deadlineInHoursToEvent * 60 * 60 * 1000,
      )

      const event = {
        title: values.title,
        date: values.date.toISOString(),
        description: values.description,
        signupDeadline: signupDeadline.toISOString(),

        headerImage: 'https://placehold.co/484x123',
        location: values.location,

        datePosted: new Date().toISOString(),
        userDisplayName: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        commentCount: 0,
        attendeeCount: 0,

        foodOption: values.foodOption,
        drinkOptions: this.drinkOptions,
      }

      //   toevoegen aan db
      await addDoc(eventCollection, event)

      this.event_in_submission = false
      this.event_alert_variant = 'bg-green-500'
      this.event_alert_msg = 'event is aangemaakt!'

      await useEventsStore().refreshEvents()

      this.$router.push({ name: 'events' })
    },
  },
}
</script>

<template>
  <section
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-auto"
  >
    <div
      class="max-w-3xl p-2 w-full py-1 bg-white rounded-lg outline outline-3 outline-ribbook-pink flex flex-col items-center gap-2.5"
    >
      <vee-form
        @submit="submitEvent"
        :validation-schema="eventSchema"
        :initial-values="{
          deadlineInHoursToEvent: 2,
          foodOption: 'no_food',
        }"
        class="w-full flex-1 flex flex-col gap-2.5"
      >
        <!--          titel-->
        <div>
          <label for="title">Titel</label>
          <vee-field
            name="title"
            placeholder="Super Coole Activiteit"
            class="w-full resize-none px-3 py-2 text-text-muted bg-bg-light rounded-lg text-base font-normal font-roboto focus:outline-none"
          ></vee-field>
          <ErrorMessage name="title" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <!--          omschrijving-->
        <div>
          <label for="description">Beschrijving</label>
          <vee-field
            as="textarea"
            name="description"
            placeholder="de bedoeling van deze activiteit? zuipen ofzo?????"
            class="w-full resize-none px-3 py-2 text-text-muted bg-bg-light rounded-lg text-base font-normal font-roboto focus:outline-none"
            @input="autoResize"
          ></vee-field>
          <ErrorMessage name="description" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <div>
          <label for="location">Locatie</label>
          <vee-field
            name="location"
            placeholder="waar? of digitaal maybe (cringe)?"
            class="w-full resize-none px-3 py-2 text-text-muted bg-bg-light rounded-lg text-base font-normal font-roboto focus:outline-none"
          ></vee-field>
          <ErrorMessage name="location" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <!-- datum en tijd -->
        <div class="w-full flex-row flex gap-2.5">
          <div class="w-full">
            <label for="date">Datum en tijd</label>
            <vee-field
              name="date"
              v-slot="{ field, handleChange }"
              :validate-on-input="false"
              :validate-on-blur="false"
              class="border-gray-300"
            >
              <VueDatePicker
                v-bind="field"
                :model-value="field.value"
                @update:model-value="handleChange"
                :min-date="new Date()"
                :flow="['calendar', 'time']"
                :start-time="{ hours: 19, minutes: 0 }"
                minutes-increment="5"
                locale="nl"
                format="dd-MM-yyyy, HH:mm"
                placeholder="kies datum en tijd"
                teleport-center
              />
            </vee-field>
            <ErrorMessage name="date" class="text-ribbook-red text-sm mt-1 block" />
          </div>
        </div>

        <!-- deadline -->
        <div>
          <label for="deadlineInHoursToEvent">Inschrijf deadline: hoeveel uur van tevoren?</label>
          <div class="flex gap-2 items-center">
            <vee-field
              as="input"
              type="number"
              name="deadlineInHoursToEvent"
              min="0.5"
              step="0.5"
              class="rounded-md p-2 border border-gray-300"
              placeholder="aantal uur"
            />
          </div>
          <ErrorMessage name="deadlineInHoursToEvent" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <!-- Food options -->
        <div>
          <label class="block pb-2">Eten?</label>
          <div class="flex gap-2">
            <vee-field name="foodOption" type="radio" value="no_food" v-slot="{ field, value }">
              <label
                class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                :class="
                  value === 'no_food'
                    ? 'bg-ribbook-pink border border-dark-gray'
                    : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                "
              >
                <input v-bind="field" type="radio" class="hidden" />
                Geen eten
              </label>
            </vee-field>

            <vee-field name="foodOption" type="radio" value="veg" v-slot="{ field, value }">
              <label
                class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                :class="
                  value === 'veg'
                    ? 'bg-ribbook-pink border border-dark-gray'
                    : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                "
              >
                <input v-bind="field" type="radio" class="hidden" />
                Vega
              </label>
            </vee-field>

            <vee-field
              name="foodOption"
              type="radio"
              value="veg_and_meat"
              v-slot="{ field, value }"
            >
              <label
                class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                :class="
                  value === 'veg_and_meat'
                    ? 'bg-ribbook-pink border border-dark-gray'
                    : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                "
              >
                <input v-bind="field" type="radio" class="hidden" />
                Vega + vlees
              </label>
            </vee-field>
          </div>

          <ErrorMessage name="foodOption" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <!-- drinken -->
        <div>
          <label class="block pb-2">Drankjes?</label>
          <div class="flex flex-wrap gap-2">
            <vee-field
              v-for="drink in drinkOptions"
              :key="drink"
              name="drinks"
              type="checkbox"
              :value="drink"
              v-slot="{ field, value }"
            >
              <label
                class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                :class="
                  value?.includes(drink)
                    ? 'bg-ribbook-pink border border-dark-gray text-white'
                    : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                "
              >
                <input v-bind="field" type="checkbox" class="hidden" />
                {{ drink }}
              </label>
            </vee-field>
          </div>

          <ErrorMessage name="drinks" class="text-ribbook-red text-sm mt-1 block" />

          <!--           custom drink toevoegen-->
          <div class="mt-3 flex gap-2 items-center">
            <input
              v-model="newDrink"
              placeholder="Ander soort drinken aanwezig?"
              class="flex-1 px-3 py-2 border rounded-lg"
              @keyup.enter="addDrink"
            />
            <button
              type="button"
              class="px-3 py-2 bg-green-500 text-white rounded-lg"
              @click="addDrink"
            >
              +
            </button>
          </div>
        </div>

        <!--          submit-->
        <button
          type="submit"
          class="px-2.5 my-1 h-10 bg-ribbook-red rounded-lg flex items-center gap-3 justify-center cursor-pointer"
        >
          <span class="text-sm font-semibold font-roboto text-ribbook-yellow"
            >Activiteit aanmaken!</span
          >
          <span class="icon icon-yellow">Calendar_Add_On</span>
        </button>
      </vee-form>
      <div
        v-show="event_show_alert"
        class="w-full px-1.5 flex gap-2.5 rounded-md"
        :class="event_alert_variant"
      >
        {{ event_alert_msg }}
      </div>
    </div>
  </section>
</template>

<style scoped>
label {
  font-size: 16px;
  font-family: 'roboto', sans-serif;
  color: var(--color-dark-gray);
  padding: 4px;
}
</style>
