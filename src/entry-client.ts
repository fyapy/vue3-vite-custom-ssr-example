import { createApp } from './main'
import { setupMft } from './ssr'

const { app, router, pinia } = createApp()

router.isReady().then(() => {
  setupMft({
    router,
    pinia,
  })

  app.mount('#app')
})
