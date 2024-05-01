import axios from 'axios'

async function getAuthors() {
	try {
		const response = await axios("http://localhost:5000/api/authors")
		return response.data
	} catch (err) {
		console.log(err)
	}
}

async function createAuthor(editedAuthor) {
	try {
		console.log(editedAuthor)
		await axios.post("http://localhost:5000/api/authors", {editedAuthor})
	}	catch (err) {
		console.log(err)
	}
}

async function deleteAuthor(id) {
	try {
		await axios.delete(`http://localhost:5000/api/authors/${id}`)
	} catch (err) {
		console.log(err)
	}
}
async function getAuthorPosts(id) {
	try {
		const response = await axios(`http://localhost:5000/api/authors/${id}/posts`)
		const {userPosts, name} = response.data
		return [userPosts, name]
	} catch (err) {
		console.log(err)
	}
}

export {getAuthors, getAuthorPosts, createAuthor, deleteAuthor}