<script>
import { defineComponent } from 'vue'
import PostsList from '@/components/PostComponents/PostsList.vue'

export default defineComponent({
  name: 'HomeView',
  components: { PostsList },
})
</script>

<template>
  <section
    class="self-stretch bg-ribbook-red inline-flex flex-col justify-between items-center overflow-hidden"
  >
    <PostsList />
  </section>
</template>
