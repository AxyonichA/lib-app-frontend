<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router';

import Input from '../components/Input.vue';

import { getAuthor } from '../requests/authorReq'
import { getFilesByEntityID } from '../requests/fileReq'

const Backend_URL = import.meta.env.VITE_BACKEND_PORT_ADDRESS

let route = useRoute()
let {authorId} = route.params

let author = ref({})

onBeforeMount(async() => {
	author.value = await getAuthor(authorId)
	author.value.photoes = await getFilesByEntityID(authorId)
})
</script>

<template>
	<div class="position-relative d-flex justify-content-center align-items-center my-auto bg-dark bg-gradient">
		<img v-for="photo in author.photoes" :src="`${Backend_URL}/${photo.file_storage_link}`" :key="photo._id" class="w-25"/>
		<div class="d-flex flex-column ">
			<h1>{{ author.fullname }}</h1>
			<div>
				<p>
					<span>Годы жизни: {{author.birthDate}}</span>
					-
					<span>{{author.deathDate}}</span>
				</p>
				<span>Место рождения: {{ author.birthPlace}}</span>				
			</div>
			<p>Место смерти: {{ author.deathPlace}}</p>
		</div>
	</div>
	<nav class="d-flex flex-grow-1 gap-4 justify-content-center fs-5 ">
		<RouterLink :to="`/authors/${authorId}/biography`" class="">Biography</RouterLink>
		<RouterLink :to="`/authors/${authorId}/books`" class="">Books</RouterLink>
		<RouterLink :to="`/authors/${authorId}/quotes`" class="">Quotes</RouterLink>
	</nav>
	<router-view>

	</router-view>
</template>