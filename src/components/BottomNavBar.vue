<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <!-- Footer nav -->
  <footer class="w-full h-[78px] bg-ribbook-red flex justify-between items-center">
    <div class="flex-1 h-full flex flex-col justify-center items-center gap-[18px]">
      <div
        class="w-28 h-[59px] bg-white/20 rounded-[34px] flex justify-center items-center gap-2.5"
      >
        <!--        home icon-->
        <span class="icon icon-40 icon-yellow icon-filled">Home</span>
      </div>
    </div>
    <div class="flex-1 h-full flex flex-col justify-center items-center gap-[18px]">
      <div class="w-28 h-[59px] flex justify-center items-center gap-2.5">
        <!--        activity icon-->
        <span class="icon icon-40 icon-yellow icon-filled">Event</span>
      </div>
    </div>
    <div class="flex-1 h-full flex flex-col justify-center items-center gap-[18px]">
      <div class="w-28 h-[59px] flex justify-center items-center gap-2.5">
        <!--        profile or bird icon-->
        <span class="icon icon-40 icon-yellow icon-filled">Person</span>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
