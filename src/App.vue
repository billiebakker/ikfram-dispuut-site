<template>
  <!--  TODO if not logged in-->
  <!--  <AppAuth />-->
  <main
    class="w-full h-screen bg-ribbook-red flex flex-col justify-between items-center overflow-hidden"
  >
    <TopHeaderBar />
    <router-view />

    <BottomNavBar />
  </main>
</template>
<script>
import TopHeaderBar from '@/components/TopHeaderBar.vue'
import BottomNavBar from '@/components/BottomNavBar.vue' // import LoginRegisterView from '@/views/LoginRegisterView.vue'
// import LoginRegisterView from '@/views/LoginRegisterView.vue'
// import AppAuth from '@/components/AppAuth.vue'
// import { mapWritableState } from 'pinia'
// import useUserStore from './stores/user'
// import { auth } from './includes/firebase'

export default {
  name: 'App',
  components: {
    TopHeaderBar,
    BottomNavBar,
    // LoginRegisterView,

    // AppAuth,
  },
  // computed: {
  //   ...mapWritableState(useUserStore, ['userLoggedIn']),
  // },
  // created() {
  //   if (auth.currentUser) {
  //     this.userLoggedIn = true
  //   }
  // },
}
</script>
