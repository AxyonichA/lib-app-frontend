import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      'vue$': 'vue/dist/vue.esm-bundler.js', // используйте esm-bundler версию Vue
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
