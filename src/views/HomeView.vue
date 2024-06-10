<script setup>
import { onBeforeMount, ref } from "vue"

import EditBookForm from '../components/EditBookForm.vue';
import BookList from "../components/BookList.vue"

import { bookAdd, bookUpdate, getBooks } from '../requests/booksReq';
import { getAuthors } from '../requests/authorReq';
import { getFileById, uploadFile } from '../requests/fileReq.js'

let books = ref([])
let editedBook = ref({})

let authors = ref([])

let modalTitle = ref('')
let modalShow = ref(false)

async function handleBookEdit(selectedFile, closeModal) {
	try {
		if(!editedBook.value.title || !editedBook.value.body || !editedBook.value.authorID) {
			return
		}
		let searchedAuthor = authors.value.find((author) => author._id == editedBook.value.authorID)
		editedBook.value.authorName = searchedAuthor.name

		// editedBook.value._id ? await bookUpdate(editedBook.value) : await bookAdd(editedBook.value)
		if(editedBook.value._id) {
			await bookUpdate(editedBook.value)
		} else {
			const createdBookID = await bookAdd(editedBook.value)
			selectedFile.options.entity_id = createdBookID
			await uploadFile(createdBookID, selectedFile)
		} 
		books.value = await getBooks()
		books.value.forEach(async(book) => {
			book.photoes = await getFileById(book._id)
		})

		closeModal()	
	} catch (err) {
		console.log(err);
	}

}


onBeforeMount(async() => {
	books.value = await getBooks()
	books.value.forEach(async(book) => {
			book.photoes = await getFileById(book._id)
		})	
	authors.value = await getAuthors()
})
</script>

<template>
	<EditBookForm @handleBookEdit="handleBookEdit" :authors="authors" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedBook="editedBook" v-model:books="books"/>
	<BookList v-model:editedBook="editedBook" v-model:books="books" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow"/>
</template>
