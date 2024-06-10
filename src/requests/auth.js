import axios from 'axios';

export async function signin(userData) {
	try {
		let {login, oldPassword} = userData
		let response = await axios.post(`/authorization/signin`, {login, passwordHash: oldPassword})
		return response.data	
	} catch (err) {
		console.log(err)
	}
}

export async function signup(userData) {
	try {
		let {login, newPassword, nickName} = userData
		let response = await axios.post(`/authorization/signup`, {login, passwordHash: newPassword, nickName})
		return response.data	
	} catch (err) {
		console.log(err)
	}
}