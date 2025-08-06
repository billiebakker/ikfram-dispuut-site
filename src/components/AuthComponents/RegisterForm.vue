<script>
import { ErrorMessage } from 'vee-validate'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'RegisterForm',
  components: { ErrorMessage },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register',
    }),
    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_msg = 'Je account wordt aangemaakt...'

      try {
        await this.createUser(values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = 'Er is een fout opgetreden'
        console.error(error)
        return
      }

      this.reg_alert_variant = 'bg-green-500'
      this.reg_alert_msg = 'Succesvol geregistreerd!'
      window.location.reload()
    },
  },
  data() {
    return {
      registerSchema: {
        naam: 'required|min:2|max:100|alpha_spaces',
        email: 'required|email|max:100',
        password: 'required|min:8|max:100',
        confirm_password: 'passwords_mismatch:@password',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: '',
    }
  },
}
</script>

<template>
  <div class="w-full max-w-[380px] px-3">
    <!-- Alert -->
    <!--    <div-->
    <!--      v-if="reg_show_alert"-->
    <!--      :class="reg_alert_variant"-->
    <!--      class="text-white text-center font-bold p-4 rounded"-->
    <!--    >-->
    <!--      {{ reg_alert_msg }}-->
    <!--    </div>-->

    <!-- Form -->
    <vee-form
      :validation-schema="registerSchema"
      @submit="register"
      class="w-full flex flex-col items-center gap-4"
    >
      <!-- Naam -->
      <div class="w-full">
        <label
          class="block w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
        >
          <vee-field
            name="naam"
            type="text"
            placeholder="Naam"
            class="w-full text-text-muted text-base font-normal focus:outline-none"
          />
        </label>
        <ErrorMessage name="naam" class="text-red-500 text-sm mt-1 block" />
      </div>

      <!-- E-mailadres -->
      <div class="w-full">
        <label
          class="block w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
        >
          <vee-field
            name="email"
            type="email"
            placeholder="E-mailadres"
            class="w-full text-text-muted text-base font-normal focus:outline-none"
          />
        </label>
        <ErrorMessage name="email" class="text-red-500 text-sm mt-1 block" />
      </div>

      <!-- Wachtwoord -->
      <div class="w-full">
        <label
          class="block w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
        >
          <vee-field
            name="password"
            type="password"
            placeholder="Wachtwoord"
            class="w-full text-text-muted text-base font-normal focus:outline-none"
          />
        </label>
        <ErrorMessage name="password" class="text-red-500 text-sm mt-1 block" />
      </div>

      <!-- Wachtwoord bevestigen -->
      <div class="w-full">
        <label
          class="block w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
        >
          <vee-field
            name="confirm_password"
            type="password"
            placeholder="Bevestig wachtwoord"
            class="w-full text-text-muted text-base font-normal focus:outline-none"
          />
        </label>
        <ErrorMessage name="confirm_password" class="text-red-500 text-sm mt-1 block" />
      </div>

      <!-- Submit button -->
      <div class="w-full flex flex-col items-center gap-4 mt-6">
        <!--        <button-->
        <!--          type="submit"-->
        <!--          class="w-[232px] h-[42px] bg-ribbook-yellow rounded outline outline-1 outline-offset-[-1px] outline-main-medium-gray flex justify-center items-center gap-2.5 disabled:opacity-60"-->
        <!--          :disabled="reg_in_submission"-->
        <!--        >-->
        <!--          <span class="text-dark-gray text-base font-semibold">Account aanmaken</span>-->
        <!--          <span class="material-symbols-rounded text-dark-gray text-xl">person_add</span>-->
        <!--        </button>-->
        <button
          class="w-[232px] h-[42px] bg-ribbook-yellow rounded outline outline-1 outline-offset-[-1px] outline-main-medium-gray flex justify-center items-center gap-2.5"
        >
          <span class="text-dark-gray text-base font-semibold">Account aanmaken</span>
        </button>
        <button
          class="w-[232px] h-[42px] rounded outline outline-1 outline-offset-[-1px] outline-ribbook-yellow flex justify-center items-center"
        >
          <span class="text-ribbook-yellow">Terug naar login</span>
        </button>
      </div>
    </vee-form>
  </div>
</template>

<style scoped></style>
