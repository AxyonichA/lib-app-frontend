<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'

import Book from './Book.vue'
import EditBookForm from './EditBookForm.vue';

import { getBooks, bookDelete, bookAdd, bookUpdate } from '../requests/booksReq';
import { getAuthorBooks, getAuthors } from '../requests/authorReq';
import { getFileById, removeFiles, uploadFile } from '../requests/fileReq'

let route = useRoute()
let {authorId} = route.params

const books = ref([])
const authors = ref([])

const editedBook = ref({})

let modalTitle = ref('')
let modalShow = ref(false)

async function handleBookEdit(selectedFile, closeModal) {
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
		books.value = authorId ? await getAuthorBooks(authorId) : await getBooks()
		books.value.forEach(async(book) => {
			book.photoes = await getFileById(book._id)
		})

		closeModal()	
	} catch (err) {
		console.log(err);
	}

}

async function handleBookDelete(book, authorId) {
	await bookDelete(book._id);
	await removeFiles(book._id)

	books.value = authorId ? (await getAuthorBooks(authorId)) : await getBooks()
	books.value.forEach(async(book) => {
		book.photoes = await getFileById(book._id)
	})		
}

function handleChangeBookClick(book) {
	editedBook.value = {...book}
	modalTitle.value = 'Редактировать книгу'
	modalShow.value = true
}

onBeforeMount(async() => {
	books.value = authorId ? await getAuthorBooks(authorId) : await getBooks()
	books.value.forEach(async(book) => {
			book.photoes = await getFileById(book._id)
		})	
	authors.value = await getAuthors()
})
</script>


<template>
	<EditBookForm @handleBookEdit="handleBookEdit" :authors="authors" :authorId="authorId" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedBook="editedBook" />
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<Book v-for="book in books" :book="book" @handleChangeBookClick="handleChangeBookClick" @handleBookDelete="handleBookDelete" :key="book.id" />
	</section>
</template>
