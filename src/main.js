import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import router from './router'

import App from './App.vue'

import './scss/styles.scss'
import * as bootstrap from 'bootstrap'

import { extractInfoFromCookies } from './services/cookies'

axios.interceptors.request.use((config) => {
	config.headers['Authorization'] = `Bearer ${extractInfoFromCookies('token')}`
	return config
})

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.mount('#app')