<script setup>
import { defineModel } from 'vue';

import Book from './Book.vue'

import { getBooks, bookDelete } from '../requests/booksReq';
import { getAuthorBooks } from '../requests/authorReq';

const editedBook = defineModel('editedBook')
const books = defineModel('books')

const modalTitle = defineModel('modalTitle')
const modalShow = defineModel('modalShow')


async function handleBookDelete(book, authorId) {
	await bookDelete(book._id);
	books.value = authorId ? (await getAuthorBooks(authorId)) : await getBooks()
}

function handleChangeBookClick(book) {
	editedBook.value = {...book}
	modalTitle.value = 'Редактировать книгу'
	modalShow.value = true
}
</script>


<template>
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<Book v-for="book in books" :book="book" @handleChangeBookClick="handleChangeBookClick" @handleBookDelete="handleBookDelete" :key="book.id" />
	</section>
</template>
