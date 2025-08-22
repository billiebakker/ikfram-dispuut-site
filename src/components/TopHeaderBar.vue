<template>
  <header class="h-[64px] shrink-0 w-full bg-ribbook-red flex justify-center items-center relative">
    <div class="text-ribbook-yellow text-[30px] font-red-october">{{ currentTitle }}</div>
    <a
      v-if="!['home', 'events', 'account'].includes($route.name)"
      class="absolute h-full left-[14px] top-0 flex justify-center items-center cursor-pointer"
      @click="$router.back()"
    >
      <span class="icon icon-40 icon-yellow">Arrow_Back</span>
    </a>
  </header>
</template>

<script>
export default {
  name: 'TopHeaderBar',
  computed: {
    currentTitle() {
      // dynamische titel op basis van route
      const map = {
        home: 'Ribbook',
        events: 'Activiteiten',
        account: 'Account',
      }
      // Ribbook als geen match
      return map[this.$route.name] || 'Ribbook'
    },
  },
}
</script>
