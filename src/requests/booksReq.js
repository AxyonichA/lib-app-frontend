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
		const response = await axios.post('/api/books', {...editedBook})
		return response.data
	} catch (err) {
		console.log(err)
	}
}

async function bookUpdate(editedBook) {
	try {
		console.log(editedBook);
		await axios.patch(`/api/books/${editedBook._id}`, {...editedBook})
	} catch (err) {
		console.log(err)
	}
}

const getBooks = async() => {
	try {
		let response = await axios.get("/api/books")
		console.log(response.data);
		console.log('getBooksReq');
		return response.data			
	} catch(err) {
		console.log(err)
	}
}

export {getBooks, bookAdd, bookUpdate, bookDelete}