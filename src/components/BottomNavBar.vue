<template>
  <nav class="w-full h-[78px] bg-ribbook-red flex justify-between items-center">
    <router-link :to="{ name: 'home' }" custom v-slot="{ isActive, href, navigate }">
      <a
        :href="href"
        @click="navigate"
        class="flex-1 h-full flex flex-col justify-center items-center gap-[18px]"
      >
        <div
          :class="[
            'w-28 h-[59px] flex justify-center items-center gap-2.5 rounded-[34px] transition-all duration-200 ease-in-out',
            isActive ? 'bg-white/30' : 'hover:bg-white/20',
          ]"
        >
          <span class="icon icon-40 icon-yellow icon-filled">Home</span>
        </div>
      </a>
    </router-link>

    <router-link :to="{ name: 'activities' }" custom v-slot="{ isActive, href, navigate }">
      <a
        :href="href"
        @click="navigate"
        class="flex-1 h-full flex flex-col justify-center items-center gap-[18px]"
      >
        <div
          :class="[
            'w-28 h-[59px] flex justify-center items-center gap-2.5 rounded-[34px] transition-all duration-200 ease-in-out',
            isActive ? 'bg-white/30' : 'hover:bg-white/20',
          ]"
        >
          <span class="icon icon-40 icon-yellow icon-filled">Event</span>
        </div>
      </a>
    </router-link>

    <router-link :to="{ name: 'account' }" custom v-slot="{ isActive, href, navigate }">
      <a
        :href="href"
        @click="navigate"
        class="flex-1 h-full flex flex-col justify-center items-center gap-[18px]"
      >
        <div
          :class="[
            'w-28 h-[59px] flex justify-center items-center gap-2.5 rounded-[34px] transition-all duration-200 ease-in-out',
            isActive ? 'bg-white/30' : 'hover:bg-white/20',
          ]"
        >
          <span class="icon icon-40 icon-yellow icon-filled">Person</span>
        </div>
      </a>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'BottomNavBar',
}
</script>
