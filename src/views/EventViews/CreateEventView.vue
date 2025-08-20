<script>
import { ErrorMessage } from 'vee-validate'
import { auth } from '@/includes/firebase.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { nl } from 'date-fns/locale'

export default {
  name: 'CreateEventView',
  components: { ErrorMessage, VueDatePicker },

  data() {
    return {
      eventSchema: {
        title: 'required|min:3|max:100',
        description: 'required|min:3|max:600',
        date: 'required',
        deadlineInHoursToEvent: 'required',
        foodOption: 'required',
      },
      event_in_submission: false,
      event_show_alert: false,
      event_alert_variant: 'bg-blue-800',
      event_alert_msg: 'even wachten...',
    }
  },
  methods: {
    nl() {
      return nl
    },
    autoResize(e) {
      const textarea = e.target
      textarea.style.height = 'auto' // eerst resetten
      textarea.style.height = textarea.scrollHeight + 'px'
    },

    async submitEvent(values, { resetForm }) {
      console.log(values)
      this.event_in_submission = true
      this.event_show_alert = true
      this.event_alert_variant = 'bg-ribbook-pink'
      this.event_alert_msg = 'ok wacht even...'

      const event = {
        title: values.title,
        date: values.date,
        description: values.description,
        deadlineInHoursToEvent: values.deadlineInHoursToEvent,
        // signupDeadline: values.signupDeadline,

        headerImage: 'https://placehold.co/484x123',

        datePosted: new Date().toISOString(),
        userDisplayName: auth.currentUser.userDisplayName,
        uid: auth.currentUser.uid,
        commentCount: 0,
        attendeeCount: 0,

        foodOption: values.foodOption,
      }

      //   toevoegen aan db
      // await addDoc(eventCollection, event)
      console.log(event)

      this.event_in_submission = false
      this.event_alert_variant = 'bg-green-500'
      this.event_alert_msg = 'event is aangemaakt!'

      // this.$router.push({ name: 'events' })
      // onnodig wss
      // resetForm()
    },
  },
}
</script>

<template>
  <section
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-auto"
  >
    <div
      class="max-w-3xl w-full py-1 bg-white rounded-lg outline outline-3 outline-ribbook-pink flex flex-col items-center gap-2.5"
    >
      <!-- pf + input container -->
      <div class="mt-0.5 w-full px-1.5 flex gap-2.5">
        <!--      input -->
        <vee-form
          v-slot="{ errors }"
          @submit="submitEvent"
          :validation-schema="eventSchema"
          :initial-values="{
            deadlineInHoursToEvent: 2,
            foodOption: 'no_food',
          }"
          class="w-full flex-1 flex flex-col gap-2.5"
        >
          <pre> {{ errors }}</pre>
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

          <!-- datum en tijd -->
          <div class="w-full flex-row flex gap-2.5">
            <div class="w-full">
              <label for="date">Datum en tijd</label>
              <vee-field name="date" v-slot="{ field, handleChange }" class="border-gray-300">
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
            <ErrorMessage
              name="deadlineInHoursToEvent"
              class="text-ribbook-red text-sm mt-1 block"
            />
          </div>

          <!-- Food options -->
          <div>
            <label>Eet opties</label>
            <div class="flex flex-col gap-1">
              <label>
                <vee-field type="radio" name="foodOption" value="no_food" />
                Geen eten
              </label>
              <label>
                <vee-field type="radio" name="foodOption" value="veg" />
                Vega
              </label>
              <label>
                <vee-field type="radio" name="foodOption" value="veg_and_meat" />
                Vega + vlees
              </label>
            </div>
            <ErrorMessage name="foodOption" class="text-ribbook-red text-sm mt-1 block" />
          </div>

          <!--          submit-->
          <button
            type="submit"
            class="px-2.5 my-1 h-10 bg-ribbook-red rounded-lg flex items-center gap-3 justify-center"
          >
            <span class="text-sm font-semibold font-roboto text-ribbook-yellow"
              >Activiteit aanmaken!</span
            >
            <span class="icon icon-yellow">Calendar_Add_On</span>
          </button>
        </vee-form>
      </div>
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
