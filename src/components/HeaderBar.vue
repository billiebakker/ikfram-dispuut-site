<script>
export default {
  name: 'HeaderBar',
}
</script>

<template>
  <div
    class="self-stretch h-[120px] relative bg-ribbook-red inline-flex justify-center items-center"
  >
    <div class="flex-1 inline-flex flex-col justify-center items-center">
      <div class="justify-start text-ribbook-yellow text-[32px] font-normal font-['Red_October']">
        Ribbook
      </div>
    </div>
    <!--    <span class="icon w-9 h-6 left-[23px] top-[26px] absolute bg-ribbook-yellow">Menu</span>-->
    <span class="icon icon-40 icon-yellow left-[23px] top-[12px] absolute">Menu</span>
  </div>
</template>
