<script>
export default {
  name: 'LoginForm',
}
</script>

<template>
  <div class="w-full max-w-[380px] px-3">
    <form class="w-full flex flex-col items-center gap-4">
      <!-- Email -->
      <label
        class="w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
      >
        <span class="text-text-muted text-base font-normal">E-mailadres</span>
      </label>

      <!-- Password -->
      <label
        class="w-full h-[42px] bg-white rounded-[5px] px-3.5 py-[5px] outline outline-2 outline-main-medium-gray flex items-center"
      >
        <span class="text-text-muted text-base font-normal">Wachtwoord</span>
      </label>

      <!-- Buttons -->
      <div class="w-full flex flex-col items-center gap-4 mt-4">
        <!-- Login -->
        <button
          type="submit"
          class="w-[232px] h-[42px] bg-ribbook-yellow rounded outline outline-1 outline-offset-[-1px] outline-main-medium-gray flex justify-center items-center gap-2.5"
        >
          <span class="text-dark-gray text-base font-semibold">LOGIN</span>
          <span class="material-symbols-rounded text-dark-gray text-xl">login</span>
        </button>

        <!-- Create account -->
        <button
          class="w-[232px] h-[42px] rounded outline outline-1 outline-offset-[-1px] outline-ribbook-yellow flex justify-center items-center"
        >
          <span class="text-ribbook-yellow text-[15px] font-semibold">Nog geen account?</span>
        </button>

        <!-- Forgot password -->
        <a href="#" class="text-ribbook-yellow text-sm font-semibold hover:underline">
          Wachtwoord vergeten
        </a>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
