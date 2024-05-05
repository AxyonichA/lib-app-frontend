import axios from 'axios'

async function bookDelete(id) {
	try {
		await axios.delete(`http://localhost:5000/api/books/${id}`, { bookId: id })
	} catch (err) {
		console.log(err)
	}
}

async function bookAdd(editedBook) {
	try {
		await axios.post('http://localhost:5000/api/books', {...editedBook})
	} catch (err) {
		console.log(err)
	}
}

async function bookUpdate(editedBook) {
	try {
		await axios.put(`http://localhost:5000/api/books/${editedBook.id}`, {...editedBook})
	} catch (err) {
		console.log(err)
	}
}

let getBooks = async() => {
	try {
		let response = await axios.get("http://localhost:5000/api/books")
		console.log('done')
		return response.data			
	} catch(err) {
		console.log(err)
	}
}

export {getBooks, bookAdd, bookUpdate, bookDelete}