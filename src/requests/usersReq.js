import axios from 'axios';

import { useAuthStore } from '../stores/useAuthStore';
import { storeToRefs } from 'pinia';


async function getUser(id) {
	const response = await axios.get(`http://localhost:5000/api/users/${id}`)
	let { user } = storeToRefs(useAuthStore())
	if(response) {
		user.value = response.data		
	}
}

export { getUser }