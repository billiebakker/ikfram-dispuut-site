<template>
  <nav class="h-[64px] shrink-0 w-full bg-ribbook-red flex justify-between items-center">
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
        class="flex-1 h-full flex flex-col justify-center items-center gap-[18px]"
      >
        <div
          :class="[
            'w-28 h-[50px] flex justify-center items-center gap-2.5 rounded-[34px] transition-all duration-200 ease-in-out',
            isActive ? 'bg-white/30' : 'hover:bg-white/20',
          ]"
        >
          <span class="icon icon-40 icon-yellow icon-filled">{{ item.icon_label }}</span>
        </div>
      </a>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'BottomNavBar',
  data() {
    return {
      navItems: [
        { name: 'home', icon_label: 'Home' },
        { name: 'activities', icon_label: 'Event' },
        { name: 'account', icon_label: 'Person' },
      ],
    }
  },
}
</script>
