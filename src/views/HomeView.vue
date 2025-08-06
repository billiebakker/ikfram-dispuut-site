<script>
import { defineComponent } from 'vue'
import PostsList from '@/components/PostComponents/PostsList.vue'

export default defineComponent({
  name: 'HomeView',
  components: { PostsList },
})
</script>

<template>
  <PostsList />
</template>
