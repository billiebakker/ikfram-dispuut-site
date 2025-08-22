<script>
import useEventsStore from '@/stores/events.js'
import { ErrorMessage } from 'vee-validate'
import router from '@/router/index.js'

export default {
  name: 'EventSignUpView',
  components: { ErrorMessage },

  data() {
    return {
      event: null,
      pendingRequest: true,
      error: null,

      signUpSchema: {
        allergies: 'max:100|alpha_spaces',
      },

      signup_in_submission: false,
      signup_show_alert: false,
      signup_alert_variant: 'bg-blue-800',
      signup_alert_msg: 'even wachten...',
    }
  },
  methods: {
    async submitSignUp(values) {
      try {
        this.signup_in_submission = true
        this.signup_show_alert = true
        this.signup_alert_variant = 'bg-blue-800'
        this.signup_alert_msg = 'even wachten...'

        await useEventsStore().signUp(this.event, values)

        this.signup_in_submission = false
        this.signup_alert_variant = 'bg-green-500'
        this.signup_alert_msg = 'Yay gelukt!'

        await router.push({ name: 'event-detail', params: { id: this.event.docID } })
      } catch (error) {
        console.error(error)
        this.signup_in_submission = false
        this.signup_alert_variant = 'bg-red-500'
        this.signup_alert_msg = 'Er is een fout opgetreden :((('
      }
    },
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
  <section
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-auto"
  >
    <div v-if="pendingRequest">laden</div>
    <div
      v-else
      class="max-w-3xl p-2 w-full py-1 bg-white rounded-lg outline outline-3 outline-ribbook-pink flex flex-col items-center gap-2.5"
    >
      <h1 class="text-text-muted text-2xl font-semibold font-roboto">
        Inschrijven voor {{ event.title }}
      </h1>
      <div v-if="event.foodOption === 'no_food' && !event.drinkOption">
        Dit event heeft geen eten of drinken!!!! Wat gaan we doen??? idk!!! schrijf je nu in
        yippie!!
      </div>
      <vee-form
        @submit="submitSignUp"
        :validation-schema="signUpSchema"
        :initial-values="{
          //   opvullen met allergieen automatisch, maybe standaard drankje, veg
        }"
        class="w-full flex-1 flex flex-col gap-2.5"
      >
        <!-- eten keuze-->
        <template v-if="event.foodOption !== 'no_food'">
          <div>
            <label class="block pb-2">Wat wil je eten?</label>
            <div class="flex gap-2">
              <vee-field
                name="foodChoice"
                type="radio"
                value="no_food_choice"
                v-slot="{ field, value }"
              >
                <label
                  class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                  :class="
                    value === 'no_food_choice'
                      ? 'bg-ribbook-pink border border-dark-gray'
                      : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                  "
                >
                  <input v-bind="field" type="radio" class="hidden" />
                  Geen eten
                </label>
              </vee-field>

              <vee-field
                name="foodChoice"
                type="radio"
                value="veg_choice"
                v-slot="{ field, value }"
              >
                <label
                  class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                  :class="
                    value === 'veg_choice'
                      ? 'bg-ribbook-pink border border-dark-gray'
                      : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                  "
                >
                  <input v-bind="field" type="radio" class="hidden" />
                  Vega
                </label>
              </vee-field>

              <vee-field
                v-if="event.foodOption === 'veg_and_meat'"
                name="foodChoice"
                type="radio"
                value="meat_choice"
                v-slot="{ field, value }"
              >
                <label
                  class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                  :class="
                    value === 'meat_choice'
                      ? 'bg-ribbook-pink border border-dark-gray'
                      : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                  "
                >
                  <input v-bind="field" type="radio" class="hidden" />
                  Vlees
                </label>
              </vee-field>
            </div>
          </div>

          <!--          wordt wss nooit getriggered-->
          <ErrorMessage name="foodChoice" class="text-ribbook-red text-sm mt-1 block" />

          <div>
            <label for="allergies" class="block pb-2">Heb je allergieën?</label>
            <vee-field
              name="allergies"
              type="text"
              placeholder="vul hier je allergieën in"
              class="w-full resize-none px-3 py-2 text-text-muted bg-bg-light rounded-lg text-base font-normal font-roboto focus:outline-none"
            />
            <ErrorMessage name="allergies" class="text-ribbook-red text-sm mt-1 block" />
          </div>
        </template>

        <!-- drinken -->
        <div v-if="event.drinkOption">
          <label class="block pb-2">Wat wil je drinken?</label>
          <div class="flex flex-wrap gap-2">
            <vee-field
              v-for="drink in event.drinkOptions"
              :key="drink"
              :value="drink"
              name="drink_choice"
              type="radio"
              v-slot="{ field, value }"
            >
              <label
                class="flex-1 text-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
                :class="
                  value === drink
                    ? 'bg-ribbook-pink border border-dark-gray'
                    : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-bg-light'
                "
              >
                <input v-bind="field" type="radio" class="hidden" />
                {{ drink }}
              </label>
            </vee-field>
          </div>

          <ErrorMessage name="drinks" class="text-ribbook-red text-sm mt-1 block" />
        </div>

        <!--          submit-->
        <button
          type="submit"
          class="px-2.5 my-1 h-10 bg-ribbook-red rounded-lg flex items-center gap-3 justify-center cursor-pointer"
        >
          <span class="text-sm font-semibold font-roboto text-ribbook-yellow">Inschrijven :)!</span>
          <!--          <span class="icon icon-yellow">Calendar_Add_On</span>-->
        </button>
      </vee-form>
      <div
        v-show="signup_show_alert"
        class="w-full px-1.5 flex gap-2.5 rounded-md"
        :class="signup_alert_variant"
      >
        {{ signup_alert_msg }}
      </div>
    </div>
  </section>
</template>
