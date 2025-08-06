import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginRegisterView from '@/views/LoginRegisterView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import AccountView from '@/views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      name: 'root',
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginRegisterView,
    },
    {
      path: '/activiteiten',
      name: 'activities',
      component: ActivitiesView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
  ],
})

export default router
