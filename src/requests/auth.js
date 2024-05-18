import axios from 'axios';

export async function signin(userData) {
	try {
		let {login, password} = userData
		let response = await axios.post(`http://localhost:5000/signin`, {login, password})
		return response.data	
	} catch (err) {
		console.log(err)
	}
}



export async function signup(userData) {
	try {
		let {login, password, nickName} = userData
		let response = await axios.post(`http://localhost:5000/signup`, {login, password, nickName})
		return response.data	
	} catch (err) {
		console.log(err)
	}
}