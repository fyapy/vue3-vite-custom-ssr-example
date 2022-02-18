import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {
      generateScopedName: '[hash:base64:5]',
      hashPrefix: ' ',
    },
  },
})
