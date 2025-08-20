import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import EventsView from '@/views/EventViews/EventsView.vue'
import AccountView from '@/views/AccountView.vue'
import useUserStore from '@/stores/user'
import PostDetailsView from '@/views/PostDetailsView.vue'
import CreateEventView from '@/views/EventViews/CreateEventView.vue'
import EventDetailsView from '@/views/EventViews/EventDetailsView.vue'

const routes = [
  {
    name: 'home',
    path: '/home',
    component: HomeView,
  },
  {
    name: 'root',
    path: '/',
    redirect: { name: 'home' },
  },
  {
    name: 'login',
    path: '/login',
    component: AuthView,
  },
  {
    path: '/activiteiten',
    children: [
      { name: 'events', path: '', component: EventsView },
      { name: 'create-event', path: 'aanmaken', component: CreateEventView },
      { name: 'event-detail', path: ':id', component: EventDetailsView },
    ],
  },
  {
    name: 'account',
    path: '/account',
    component: AccountView,
  },
  {
    name: 'post-detail',
    path: '/post/:id',
    component: PostDetailsView,
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' },
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
