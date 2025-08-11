<script>
export default {
  name: 'PostItem',
  props: {
    post: Object,
  },
}
</script>

<template>
  <section
    class="max-w-[480px] w-full bg-white rounded-[13px] outline outline-[3px] outline-ribbook-yellow flex flex-col items-center gap-2.5"
  >
    <!-- Header with avatar and name -->
    <header class="w-full flex flex-col items-center gap-[5px]">
      <div class="w-full h-[54px] pl-1.5 pr-[22px] flex items-center gap-1 overflow-hidden">
        <div class="w-[46px] h-[46px] bg-ribbook-pink rounded-full"></div>
        <div class="px-[9px] flex items-center gap-6 overflow-hidden">
          <h2 class="text-black text-base font-semibold font-roboto">
            {{ post.userDisplayName }}
          </h2>
          <p class="text-[#4f4f4f] text-sm font-normal font-roboto">
            {{ post.datePosted }}
          </p>
        </div>
      </div>
    </header>

    <!-- Body text -->
    <article class="w-full px-3 py-[5px] flex flex-col items-center gap-[13px] overflow-hidden">
      <p class="w-full text-black text-base font-normal font-roboto">
        {{ post.postText }}
      </p>
    </article>

    <!-- Footer with interaction icons -->
    <footer class="w-full px-[25px] py-1 flex justify-between items-center">
      <!-- Comments -->
      <div class="flex items-center gap-1">
        <span class="icon icon-500 icon-gray">Chat_Bubble</span>
        <span class="text-comment-stats">3</span>
      </div>

      <!-- Likes -->
      <div class="flex items-center gap-1">
        <span class="icon icon-500 icon-gray">Handshake</span>
        <span class="text-comment-stats">4</span>
      </div>

      <!-- Shares -->
      <div class="flex items-center gap-1">
        <span class="icon icon-500 icon-gray">Gavel</span>
        <span class="text-comment-stats">8</span>
      </div>
    </footer>
  </section>
</template>
