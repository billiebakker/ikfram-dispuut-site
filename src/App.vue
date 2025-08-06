<template>
  <!--  TODO if not logged in-->
  <!--  <AppAuth />-->
  <main
    class="w-full h-screen bg-ribbook-red flex flex-col justify-between items-center overflow-hidden"
  >
    <HeaderBar v-if="true" />
    <router-view />

    <!--  TODO if not logged in-->
    <BottomNavBar v-if="true" />
  </main>
</template>
<script>
import HeaderBar from '@/components/HeaderBar.vue'
import BottomNavBar from '@/components/BottomNavBar.vue' // import LoginRegisterView from '@/views/LoginRegisterView.vue'
// import LoginRegisterView from '@/views/LoginRegisterView.vue'
// import AppAuth from '@/components/AppAuth.vue'
// import { mapWritableState } from 'pinia'
// import useUserStore from './stores/user'
// import { auth } from './includes/firebase'

export default {
  name: 'App',
  components: {
    HeaderBar,
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
