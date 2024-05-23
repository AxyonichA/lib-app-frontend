import axios from 'axios';
import { extractInfoFromCookies } from './cookies'

axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.request.use((config) => {
	config.headers['Authorization'] = `Bearer ${extractInfoFromCookies('token')}`
	return config	
})

export { axios }