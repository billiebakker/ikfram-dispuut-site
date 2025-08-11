import { createApp } from 'vue'
import { createPinia } from 'pinia'
import timeago from 'vue-timeago3'
import { nl } from 'date-fns/locale'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from '@/includes/validation'
import { auth } from '@/includes/firebase'

import '@/assets/base.css'
import '@/assets/main.css'

let app

auth.onAuthStateChanged(() => {
  if (app) return
  app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(VeeValidatePlugin)
  app.use(timeago, {
    locale: nl,
  })

  app.mount('#app')
})
