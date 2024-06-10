<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router';

import EditBookForm from '../components/EditBookForm.vue'
import BookList from "../components/BookList.vue"

import { getAuthors, getAuthorBooks } from '../requests/authorReq';
import { bookAdd, bookUpdate } from '../requests/booksReq'
import { getFileById, uploadFile } from '../requests/fileReq'


let route = useRoute()
let {authorId} = route.params

let books = ref([])
let editedBook = ref({})

let authors = ref([])

let modalTitle = ref('')
let modalShow = ref(false)

async function handleAuthorBookEdit(selectedFile, closeModal) {
	try {
		if(!editedBook.value.title || !editedBook.value.body || !editedBook.value.authorID) {
			return
		}
		let searchedAuthor = authors.value.find((author) => author._id == editedBook.value.authorID)
		editedBook.value.authorName = searchedAuthor.name

		if(editedBook.value._id) {
			await bookUpdate(editedBook.value)
		} else {
			const createdBookID = await bookAdd(editedBook.value)
			selectedFile.options.entity_id = createdBookID
			await uploadFile(createdBookID, selectedFile)
		} 

		books.value = await getAuthorBooks(authorId)
		books.value.forEach(async(book) => {
			book.photoes = await getFileById(book._id)
		})
		closeModal()	
		
	} catch (err) {
		console.log(err);
	}

}


onBeforeMount(async() => {
	books.value = await getAuthorBooks(authorId)
	books.value.forEach(async(book) => {
			book.photoes = await getFileById(book._id)
		})	
	authors.value = await getAuthors()
})

</script>

<template>
	<EditBookForm @handleAuthorBookEdit="handleAuthorBookEdit" :authors="authors" :authorId="authorId" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedBook="editedBook" v-model:books="books"/>
	<BookList v-if="books.length !== 0"  v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedBook="editedBook" v-model:books="books"/>
	<p v-if="books.length === 0">У данного автора ещё нет публикаций</p>
</template>