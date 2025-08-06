import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginRegisterView from '@/views/LoginRegisterView.vue'
import PostsView from '@/views/PostsView.vue'

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
      path: '/posts',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginRegisterView,
    },
    {
      path: '/activiteiten',
      name: 'activiteiten',
      // component: ActiviteitenView,
    },
    {
      path: '/account',
      name: 'account',
      // component: ManageAccountView,
    },
  ],
})

export default router
