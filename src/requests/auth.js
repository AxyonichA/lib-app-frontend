import axios from 'axios';

export async function authorizate(userData) {
	try {
		let {login, password} = userData
		let response = await axios(`http://localhost:5000/auth?login=${login}&password=${password}`)
		return response.data	
	} catch (err) {
		console.log(err)
	}
}

export async function registrate (userData) {
	try {
		let {login, password, nickName} = userData
		let response = await axios(`http://localhost:5000/auth?login=${login}&password=${password}&nickname=${nickName}`)
		return response.data	
	} catch (err) {
		console.log(err)
	}
}