import axios from 'axios'

async function getAuthors() {
	try {
		const response = await axios.get("/api/authors")
		return response.data
	} catch (err) {
		console.log(err)
	}
}

async function getAuthor(id) {
	try {
		const response = await axios.get(`/api/authors/${id}`)
		return response.data
	} catch (err) {
		console.log(err);
	}
}
async function createAuthor(editedAuthor) {
	try {
		const response = await axios.post("/api/authors", {...editedAuthor})
		return response.data
	}	catch (err) {
		console.log(err)
	}
}

async function updateAuthor(editedAuthor) {
	try {
		const response = await axios.patch(`/api/authors/${editedAuthor._id}`, editedAuthor)
		return response.data
	} catch (err) {
		console.log(err);
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
		return response.data
	} catch (err) {
		console.log(err)
	}
}

export {getAuthors, getAuthor, getAuthorBooks, createAuthor, updateAuthor, deleteAuthor}