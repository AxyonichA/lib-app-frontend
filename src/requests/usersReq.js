import axios from 'axios';

import { useAuthStore } from '../stores/useAuthStore';
import { storeToRefs } from 'pinia';


const getUsers = async() => {
	try {
		const response = await axios.get('/api/users')
		return response.data		
	} catch (err) {
		console.log(err)
	}
}

async function getUser(id) {
	try {
		const response = await axios.get(`/api/users/${id}`)
		let { user } = storeToRefs(useAuthStore())
		user.value = response.data		
	} catch (err) {
		console.log(err);
	}
}

async function deleteUser(id) {
	try {
		await axios.delete(`/api/users/${id}`)
	} catch (err) {
		console.log(err);
	}
}

async function updateUser(editedUser) {
	try {
		const response = await axios.patch(`/api/users/${editedUser._id}`, {...editedUser})
		console.log(response.data.msg)
	} catch (err) {
		console.log(err);
	}
}

async function changeUserPassword(userID, oldPassword, newPassword) {
	try {
		console.log('not patched');
		await axios.patch(`/api/users/${userID}/changePassword`, {oldPassword, newPassword})
		console.log('patched');
	} catch (err) {
		console.log(err);
	}
}

export { getUsers, getUser, deleteUser, updateUser, changeUserPassword }