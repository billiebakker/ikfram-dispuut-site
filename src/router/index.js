import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
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
    component: AuthView,
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

router.beforeEach(async (to) => {
  const publicPages = ['login']
  const authRequired = !publicPages.includes(to.name)
  const userStore = useUserStore()

  if (!userStore.authReady) {
    await userStore.initAuth()
  }

  // unauthed en wil naar een page
  if (authRequired && !userStore.userLoggedIn) {
    return { name: 'login' }
  }

  // om authed gebruikers naar home te sturen als ze naar login gaan
  if (to.name === 'login' && userStore.userLoggedIn) {
    return { name: 'home' }
  }

  return true
})

export default router
