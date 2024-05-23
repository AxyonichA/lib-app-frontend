import axios from 'axios'

async function bookDelete(id) {
	try {
		await axios.delete(`/api/books/${id}`, { bookId: id })
	} catch (err) {
		console.log(err)
	}
}

async function bookAdd(editedBook) {
	try {
		await axios.post('/api/books', {...editedBook})
	} catch (err) {
		console.log(err)
	}
}

async function bookUpdate(editedBook) {
	try {
		await axios.put(`/api/books/${editedBook.id}`, {...editedBook})
	} catch (err) {
		console.log(err)
	}
}

let getBooks = async() => {
	try {
		let response = await axios.get("/api/books")
		return response.data			
	} catch(err) {
		console.log(err)
	}
}

export {getBooks, bookAdd, bookUpdate, bookDelete}