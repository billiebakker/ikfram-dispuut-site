<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <section class="w-full pt-[120px] flex flex-col items-center gap-[30px] flex-grow">
      <header class="flex flex-col items-center gap-3 text-center">
        <h1 class="text-ribbook-yellow text-[32px] font-red-october">Corduroy</h1>
        <h2 class="text-ribbook-yellow text-2xl font-red-october">Ribbook</h2>
      </header>

      <!-- Form -->
      <form class="w-full max-w-[380px] flex flex-col items-center gap-[20px]">
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
            type="button"
            class="w-[232px] h-[42px] rounded outline outline-1 outline-offset-[-1px] outline-ribbook-yellow flex justify-center items-center"
          >
            <span class="text-ribbook-yellow text-[15px] font-semibold">Account aanmaken</span>
          </button>

          <!-- Forgot password -->
          <a href="#" class="text-ribbook-yellow text-sm font-semibold hover:underline">
            Wachtwoord vergeten?
          </a>
        </div>
      </form>
    </section>

    <div class="w-full h-[64px] bg-ribbook-yellow" />
  </div>
</template>
<script setup lang="ts"></script>
