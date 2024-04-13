import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'
const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')