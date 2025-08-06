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
    <div class="absolute h-full left-[23px] top-0 flex justify-center items-center">
      <span class="icon icon-40 icon-yellow">Menu</span>
    </div>
  </div>
</template>
