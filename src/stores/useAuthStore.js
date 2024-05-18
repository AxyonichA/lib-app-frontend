import { ref } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios'

export const useAuthStore = defineStore('authStore', () => {
	const user = ref(undefined)

	return { user }
})