<script>
import { ErrorMessage } from 'vee-validate'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'LoginForm',
  components: { ErrorMessage },
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:100',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-800',
      login_alert_msg: 'even wachten...',
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      loginUser: 'authenticate',
    }),
    async login(values) {
      this.login_in_submission = true
      this.login_show_alert = true
      this.login_alert_variant = 'bg-blue-800'
      this.login_alert_msg = 'even wachten...'

      try {
        await this.loginUser(values)
      } catch (error) {
        this.login_in_submission = false
        this.login_alert_variant = 'bg-red-500'
        this.login_alert_msg = 'verkeerde gegevens!!! probeer nog eens'
        console.error(error)
        return
      }

      this.login_alert_variant = 'bg-green-500'
      this.login_alert_msg = 'Yay gelukt!'
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<template>
  <div class="w-full max-w-[380px] px-3">
    <div
      v-if="login_show_alert"
      :class="login_alert_variant"
      class="h-[42px] rounded-[5px] px-3.5 py-[5px] text-white font-bold mb-4 outline outline-3 outline-ribbook-yellow flex items-center justify-center"
    >
      {{ login_alert_msg }}
    </div>

    <vee-form
      :validation-schema="loginSchema"
      @submit="login"
      class="w-full flex flex-col items-center gap-4"
    >
      <!--      email-->
      <div class="w-full">
        <label
          class="w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
        >
          <vee-field
            name="email"
            type="email"
            placeholder="E-mailadres"
            class="w-full text-text-muted text-base font-normal focus:outline-none"
          />
        </label>
        <ErrorMessage name="email" class="text-ribbook-yellow text-sm mt-1 block" />
      </div>

      <!-- wachtwoord -->
      <div class="w-full">
        <label
          class="w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
        >
          <vee-field
            name="password"
            type="password"
            placeholder="Wachtwoord"
            class="w-full text-text-muted text-base font-normal focus:outline-none"
          />
        </label>
        <ErrorMessage name="password" class="text-ribbook-yellow text-sm mt-1 block" />
      </div>

      <!-- submit -->
      <div class="w-full flex flex-col items-center gap-4 my-6">
        <button
          class="w-[232px] h-[42px] bg-ribbook-yellow rounded outline outline-1 outline-offset-[-1px] outline-main-medium-gray flex justify-center items-center gap-2.5"
          type="submit"
          :disabled="login_in_submission"
        >
          <span class="text-dark-gray text-base font-semibold">LOGIN</span>
          <span class="material-symbols-rounded text-dark-gray text-xl">login</span>
        </button>
      </div>
    </vee-form>
  </div>
</template>
