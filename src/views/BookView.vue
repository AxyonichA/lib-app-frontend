<script setup>
import { RouterLink, useRoute } from 'vue-router';

import Input from '../components/Input.vue';
import { onBeforeMount, ref } from 'vue'
import { getFilesByEntityID } from '../requests/fileReq'
import { getBook } from '../requests/booksReq';

const Backend_URL = import.meta.env.VITE_BACKEND_PORT_ADDRESS
let route = useRoute()

let {bookID, authorId} = route.params

let book = ref({})

onBeforeMount(async() => {
	book.value = await getBook(bookID)
	book.value.photoes = await getFilesByEntityID(bookID)
})
</script>

<template>
	<div class="position-relative d-flex justify-content-center align-items-center my-auto bg-dark bg-gradient">
		<img v-for="photo in book.photoes" :src="`${Backend_URL}/${photo.file_storage_link}`" :key="photo._id" class="w-25"/>
		<div class="d-flex flex-column ">
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control w-50': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedBook.title"/>
			<h1 v-else class="">{{ book.title }}</h1>
			<div>
				<p class="">
					<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control d-inline w-25': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedBook.body"/>
					<span v-else>Краткое описание: {{book.body}}</span>
				</p>			
			</div>
		</div>
	</div>
	<nav class="d-flex flex-grow-1 gap-4 justify-content-center fs-5 ">
		<RouterLink :to="`/books/${bookID}/biography`" class="">Description</RouterLink>
		<RouterLink :to="`/books/${bookID}/quotes`" class="">Quotes</RouterLink>
	</nav>
	<router-view>

	</router-view>
</template>