<script setup>
import { useRoute } from 'vue-router'

const Backend_URL = import.meta.env.VITE_BACKEND_PORT_ADDRESS

import { useAuthStore } from '../stores/useAuthStore';

const { user } = useAuthStore()

let route = useRoute()
let {authorId} = route.params

defineProps({
	book: Object,
})

defineEmits([
	'handleBookDelete',
	'handleChangeBookClick'
])

</script>

<template>
	<RouterLink :to="`/books/${book._id}`" :key="book._id">
		<article class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<img v-for="photo in book.photoes" :src="`${Backend_URL}/${photo.file_storage_link}`" :key="photo._id" class="w-50"/>
			<h2 class="my-auto">{{book.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{book.body}}</p>
			<span v-if="!authorId" class="ms-auto fs-5">{{ book.authorName }}</span>
			<button v-if="user.role === 'admin'" @click.prevent="() => $emit('handleBookDelete', book, authorId)" class="btn btn-danger">Удалить книгу</button>
			<button v-if="user.role === 'admin'" @click.prevent="() => $emit('handleChangeBookClick', book)" class="btn btn-secondary mt-1">Редактировать</button>
		</article>
	</RouterLink>

</template>