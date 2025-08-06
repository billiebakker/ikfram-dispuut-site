<script>
import { defineComponent } from 'vue'
import PostsList from '@/components/PostComponents/PostsList.vue'

export default defineComponent({
  components: { PostsList },
})
</script>

<template>
  <!--  <section class="flex-auto px-2.5 py-1 flex flex-col justify-start items-start gap-3.5">-->
  <section
    class="self-stretch bg-ribbook-red inline-flex flex-col justify-between items-center overflow-hidden"
  >
    <PostsList />
  </section>
</template>
