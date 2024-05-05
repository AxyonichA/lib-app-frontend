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
async function getAuthorBooks(id) {
	try {
		const response = await axios(`http://localhost:5000/api/authors/${id}/books`)
		const {authorBooks, name} = response.data
		return [authorBooks, name]
	} catch (err) {
		console.log(err)
	}
}

export {getAuthors, getAuthorBooks, createAuthor, deleteAuthor}