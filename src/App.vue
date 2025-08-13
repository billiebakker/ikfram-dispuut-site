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
  <main v-if="authReady" class="w-full h-screen bg-ribbook-red flex flex-col">
    <TopHeaderBar v-if="userLoggedIn" />

    <router-view class="flex-1" />

    <BottomNavBar v-if="userLoggedIn" />
  </main>
</template>
