<script>
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import useUserStore from '@/stores/user'

export default defineComponent({
  name: 'AccountView',
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async signOut() {
      await this.userStore.logout()
      this.$router.push({ name: 'login' })
    },
  },
})
</script>

<template>
  <section
    class="self-stretch bg-ribbook-red inline-flex flex-col justify-between items-center overflow-hidden"
  >
    account hoi
    <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
  </section>
  <div></div>
</template>
