<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <section
      class="w-full pt-[20px] flex flex-col items-center gap-[30px] flex-grow overflow-scroll"
      :class="loginOrRegister === 'login' ? 'pt-[100px]' : 'pt-[30px]'"
    >
      <header class="flex flex-col items-center gap-3 text-center">
        <h1 class="text-ribbook-yellow text-[32px] font-red-october">Corduroy</h1>
        <h2 class="text-ribbook-yellow text-2xl font-red-october">Ribbook</h2>
      </header>

      <LoginForm v-if="loginOrRegister === 'login'" />
      <RegisterForm v-else />

      <!--      naar login of register-->
      <button
        @click.prevent="loginOrRegister = loginOrRegister === 'login' ? 'register' : 'login'"
        class="w-[232px] h-[42px] mb-4 rounded outline outline-1 outline-offset-[-1px] outline-ribbook-yellow justify-center items-center"
      >
        <span class="text-ribbook-yellow text-[15px] font-semibold">{{
          loginOrRegister === 'login' ? 'Nog geen account?' : 'Terug naar login'
        }}</span>
      </button>
    </section>
    <div class="w-full h-[52px] bg-ribbook-yellow" />
  </div>
</template>
<script>
import RegisterForm from '@/components/AuthComponents/RegisterForm.vue'
import LoginForm from '@/components/AuthComponents/LoginForm.vue'

export default {
  name: 'AuthView',
  components: {
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      loginOrRegister: 'login',
    }
  },
}
</script>
