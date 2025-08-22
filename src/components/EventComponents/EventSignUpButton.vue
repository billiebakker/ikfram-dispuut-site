<script>
export default {
  name: 'EventSignUpButton',
  props: {
    event: Object,
  },
}
</script>

<template>
  <button
    class="flex-col hover:bg-red-400 transition-all duration-200 ease-in-out mx-2 px-5 py-2 border-2 border-ribbook-yellow rounded-lg flex justify-between items-center"
    @click="$router.push({ name: 'event-signup', params: { id: event.docID } })"
  >
    <span class="text-ribbook-yellow text-lg font-semibold">AANMELDEN!</span>
    <span class="text-sm text-ribbook-yellow"
      >Inschrijving sluit <timeago class="font-semibold" :datetime="event.signupDeadline" />
    </span>
  </button>
</template>
