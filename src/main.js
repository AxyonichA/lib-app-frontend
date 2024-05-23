import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { axios} from './services/axios'
import router from './router'

import App from './App.vue'

import './scss/styles.scss'
import * as bootstrap from 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.mount('#app')