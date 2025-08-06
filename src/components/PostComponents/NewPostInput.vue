<script>
export default {
  name: 'NewPostInput',
}
</script>

<template>
  <!-- Post input section -->
  <!--  TODO icon Send-->

  <section
    class="max-w-[480px] w-full py-[5px] bg-white rounded-[13px] outline outline-[3px] outline-ribbook-yellow flex flex-col items-center gap-2.5"
  >
    <!-- Avatar + input field -->
    <div class="w-full px-1.5 flex items-center gap-2.5">
      <div class="py-1">
        <div class="w-[46px] h-[46px] bg-ribbook-pink rounded-full"></div>
      </div>
      <div
        class="flex-1 px-5 py-2 bg-[--color-bg-light] rounded-[20px] flex items-center overflow-hidden"
      >
        <p class="text-[--color-text-muted] text-base font-normal font-roboto">Maak een post...</p>
      </div>
      <button
        class="px-2.5 py-[5px] bg-ribbook-red rounded-[9px] flex items-center gap-[9px] overflow-hidden"
      >
        <span class="icon icon-yellow">Send</span>
      </button>
    </div>

    <!-- Post options -->
    <div class="w-full px-[52px] py-[3px] flex flex-col items-start gap-[5px] overflow-hidden">
      <div class="w-full px-[141px] flex justify-between items-center">
        <div class="flex items-center gap-1 overflow-hidden">
          <div class="w-[22px] h-[22px] relative overflow-hidden">
            <div
              class="w-[20.18px] h-[18.33px] absolute left-[0.91px] top-[1.83px] bg-[--color-text-muted]"
            ></div>
          </div>
          <span class="text-[--color-text-muted] text-base font-normal font-roboto">Opties...</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
