<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <section class="w-full pt-[120px] flex flex-col items-center gap-[30px] flex-grow">
      <header class="flex flex-col items-center gap-3 text-center">
        <h1 class="text-ribbook-yellow text-[32px] font-red-october">Corduroy</h1>
        <h2 class="text-ribbook-yellow text-2xl font-red-october">Ribbook</h2>
      </header>

      <!-- Form -->
      <!--      <LoginForm />-->
      <RegisterForm />
    </section>

    <div class="w-full h-[64px] bg-ribbook-yellow" />
  </div>
</template>
<script setup lang="ts">
import RegisterForm from '@/components/AuthComponents/RegisterForm.vue'
</script>
