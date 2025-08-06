<script>
import PostItem from '@/components/PostComponents/PostItem.vue'
import NewPostInput from '@/components/PostComponents/NewPostInput.vue'

export default {
  name: 'PostsList',
  components: { NewPostInput, PostItem },
}
</script>

<template>
  <!--  TODO for all posts etc, endless scrolling maybe-->

  <div
    class="w-full flex-1 px-2.5 py-1 flex flex-col justify-start items-center gap-2.5 overflow-x-scroll"
  >
    <NewPostInput />
    <PostItem />
    <PostItem />
    <PostItem />
    <PostItem />
    <PostItem />
    <PostItem />
    <PostItem />
  </div>
</template>
