<script setup>
import { RouterLink, useRoute } from 'vue-router';

import Input from '../components/Input.vue';
import { getAuthor, updateAuthor } from '../requests/authorReq'
import { onBeforeMount, ref } from 'vue'
import { getFileById } from '../requests/fileReq'

const Backend_URL = import.meta.env.VITE_BACKEND_PORT_ADDRESS
let route = useRoute()

let {authorId} = route.params

let author = ref({})
let editedAuthor = ref({...author.value})
let isEdit = ref(false)

function editToggle() {
	isEdit.value = !isEdit.value
	editedAuthor.value = {...author.value}
}

const removeMatchingKeys = (obj1, obj2) => {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key] && key !== '_id') {
      delete obj1[key];
    }
  }
}

async function handleAuthorUpdate() {
	try {
		removeMatchingKeys(editedAuthor.value, author.value)
		const result = await updateAuthor(editedAuthor.value)
		author.value = await getAuthor(author.value._id)
		author.value.photoes = await getFileById(authorId)
		isEdit.value = false
	} catch (err) {
		console.log(err);
	}
}

onBeforeMount(async() => {
	author.value = await getAuthor(authorId)
	author.value.photoes = await getFileById(authorId)
})
</script>

<template>
	<div class="position-relative d-flex justify-content-center align-items-center my-auto bg-dark bg-gradient">
		<img v-for="photo in author.photoes" :src="`${Backend_URL}/${photo.file_storage_link}`" :key="photo._id" class="w-25"/>
		<div class="d-flex flex-column ">
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control w-50': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.fullname"/>
			<h1 v-else class="">{{ author.fullname }}</h1>
			<div>
				<p class="">
					<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control d-inline w-25': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.birthDate"/>
					<span v-else>Годы жизни: {{author.birthDate}}</span>
					-
					<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control d-inline w-25': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.deathDate"/>
					<span v-else>{{author.deathDate}}</span>
				</p>
				<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control w-50': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.birthPlace"/>
				<span v-else class="">Место рождения: {{ author.birthPlace}}</span>				
			</div>
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control w-50': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.deathPlace"/>
			<p v-else class="">Место смерти: {{ author.deathPlace}}</p>
		</div>
		<div class="position-absolute top-0 end-0">
			<button @click.prevent="editToggle" class="btn btn-primary">
				{{ isEdit ? 'Отмена' : 'Редактировать'}}
			</button>
			<button v-if="isEdit" @click.prevent="handleAuthorUpdate" class="btn btn-secondary">Сохранить изменения</button>				
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