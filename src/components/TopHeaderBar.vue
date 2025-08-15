<template>
  <header class="h-[64px] shrink-0 w-full bg-ribbook-red flex justify-center items-center relative">
    <div class="text-ribbook-yellow text-[30px] font-red-october">{{ currentTitle }}</div>
    <!--    <div class="absolute h-full left-[14px] top-0 flex justify-center items-center">-->
    <!--      <span class="icon icon-40 icon-yellow">Menu</span>-->
    <!--    </div>-->
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
