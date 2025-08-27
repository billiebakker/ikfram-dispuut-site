<template>
  <div
    class="h-[64px] w-full bg-ribbook-rood justify-center flex items-center border-t-1 border-ribbook-pink/20"
  >
    <nav class="shrink-0 w-full flex justify-between items-center max-w-4xl">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="{ name: item.name }"
        custom
        v-slot="{ isActive, href, navigate }"
      >
        <a
          :href="href"
          @click="navigate"
          class="flex-1 h-full flex flex-col justify-center items-center gap-4"
        >
          <div
            :class="[
              'w-28 h-13 flex justify-center items-center gap-2.5 rounded-full transition-all duration-200 ease-in-out',
              isActive ? 'bg-white/30' : 'hover:bg-white/20',
            ]"
          >
            <span class="icon icon-40 icon-yellow icon-filled">{{ item.icon_label }}</span>
          </div>
        </a>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BottomNavBar',
  data() {
    return {
      navItems: [
        { name: 'home', icon_label: 'Home' },
        { name: 'events', icon_label: 'Event' },
        { name: 'account', icon_label: 'Person' },
      ],
    }
  },
}
</script>
