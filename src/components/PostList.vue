<script setup>
import { defineModel } from 'vue';

import Post from './Post.vue'

import { getBooks, bookDelete } from '../requests/booksReq';
import { getAuthorBooks } from '../requests/authorReq';

const editedBook = defineModel('editedBook')
const books = defineModel('books')

const modalTitle = defineModel('modalTitle')
const modalShow = defineModel('modalShow')


async function handlePostDelete(book, authorId) {
	await bookDelete(book.id);
	books.value = authorId ? (await getAuthorBooks(authorId))[0] : await getBooks()
}

function handleChangePostClick(book) {
	editedBook.value = {...book}
	modalTitle.value = 'Редактировать книгу'
	modalShow.value = true
}
</script>


<template>
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<Post v-for="book in books" :book="book" @handleChangePostClick="handleChangePostClick" @handlePostDelete="handlePostDelete" :key="book.id" />
	</section>
</template>
