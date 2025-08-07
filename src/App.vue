<template>
  <main class="w-full h-screen bg-ribbook-red flex flex-col overflow-hidden">
    <TopHeaderBar v-if="userStore.userLoggedIn" />

    <section class="flex-1 overflow-auto">
      <router-view />
    </section>

    <BottomNavBar v-if="userStore.userLoggedIn" />
  </main>
</template>

<script>
import TopHeaderBar from '@/components/TopHeaderBar.vue'
import BottomNavBar from '@/components/BottomNavBar.vue'
import { mapStores } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'App',
  components: {
    TopHeaderBar,
    BottomNavBar,
  },
  computed: {
    ...mapStores(useUserStore),
  },
}
</script>
