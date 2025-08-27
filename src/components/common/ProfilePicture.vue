<script>
export default {
  name: 'ProfilePicture',
  props: {
    userPhotoURL: {
      type: String,
      required: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div class="rounded-full bg-ribbook-pink" :class="big ? 'w-24 h-24' : 'w-12 h-12'">
    <img
      v-if="userPhotoURL"
      :src="userPhotoURL"
      alt="Profielfoto"
      class="rounded-full object-cover"
      :class="big ? 'w-24 h-24' : 'w-12 h-12'"
    />
  </div>
</template>
