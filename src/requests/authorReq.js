import axios from 'axios'

async function getAuthors() {
	try {
		const response = await axios("/api/authors")
		return response.data
	} catch (err) {
		console.log(err)
	}
}

async function createAuthor(editedAuthor) {
	try {
		console.log(editedAuthor)
		await axios.post("/api/authors", {editedAuthor})
	}	catch (err) {
		console.log(err)
	}
}

async function deleteAuthor(id) {
	try {
		const response = await axios.delete(`/api/authors/${id}`)
	} catch (err) {
		console.log(err.response.data.msg)
	}
}
async function getAuthorBooks(id) {
	try {
		const response = await axios(`/api/authors/${id}/books`)
		const {authorBooks, name} = response.data
		return [authorBooks, name]
	} catch (err) {
		console.log(err)
	}
}

export {getAuthors, getAuthorBooks, createAuthor, deleteAuthor}