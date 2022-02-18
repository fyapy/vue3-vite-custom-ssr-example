import App from './App.vue'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { createRouter } from './router'

export const createApp = () => {
  const app = createSSRApp(App)
  const router = createRouter()
  const pinia = createPinia()
  const head = createHead()

  app.use(router)
  app.use(pinia)
  app.use(head)

  return {
    app,
    head,
    pinia,
    router,
  }
}
