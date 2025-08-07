<script lang="ts">
import TopHeaderBar from '@/components/TopHeaderBar.vue'
import BottomNavBar from '@/components/BottomNavBar.vue'
import useUserStore from '@/stores/user'

export default {
  name: 'App',
  components: {
    TopHeaderBar,
    BottomNavBar,
  },
  computed: {
    userLoggedIn() {
      return useUserStore().userLoggedIn
    },
    authReady() {
      return useUserStore().authReady
    },
  },
  async created() {
    const userStore = useUserStore()
    await userStore.initAuth()
  },
}
</script>

<template>
  <main v-if="authReady" class="w-full h-screen bg-ribbook-red flex flex-col overflow-hidden">
    <TopHeaderBar v-if="userLoggedIn" />

    <section class="flex-1 overflow-auto">
      <router-view />
    </section>

    <BottomNavBar v-if="userLoggedIn" />
  </main>
</template>
