<script>
import { defineComponent } from 'vue'
import PostItem from '@/components/PostComponents/PostItem.vue'
import Test from '@/components/test.vue'

export default defineComponent({
  components: { Test, PostItem },
})
</script>

<template>
  <test />
</template>
