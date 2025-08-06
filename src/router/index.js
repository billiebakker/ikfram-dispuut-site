import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ActivitiesView from '@/views/ActivitiesView.vue'
import AccountView from '@/views/AccountView.vue'
import useUserStore from '@/stores/user'

const routes = [
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
    component: LoginView,
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.name !== 'login' && !userStore.userLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
