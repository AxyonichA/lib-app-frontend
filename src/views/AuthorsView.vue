<script setup>
import { onBeforeMount, ref } from "vue"
import { RouterLink } from 'vue-router'

import useFileChangeHandler from '../composables/useFileChangeHandler.js';

const Backend_URL = import.meta.env.VITE_BACKEND_PORT_ADDRESS

import Modal from '../components/Modal.vue'
import Input from '../components/Input.vue';

import { getAuthors, createAuthor, deleteAuthor } from '../requests/authorReq';
import { getFileById, removeFiles, uploadFile } from '../requests/fileReq.js';
import { useAuthStore } from '../stores/useAuthStore';
const { user } = useAuthStore()

let authors = ref([])
let editedAuthor = ref({
	name: ''
})

let modalTitle = ref('')
let modalShow = ref(false)

const authorFileInput = ref(null)
const fileHandler = useFileChangeHandler('authors', 'author-photo')


async function handleAuthorCreate() {
	if(!editedAuthor.value.name || !fileHandler.selectedFile.value) {
		return
	}

	const createdAuthorID = await createAuthor(editedAuthor.value)
	fileHandler.selectedFile.value.options.entity_id = createdAuthorID
	
	await uploadFile(createdAuthorID, fileHandler.selectedFile.value)

	authors.value = await getAuthors()
	authors.value.forEach(async(author) => {
		author.photoes = await getFileById(author._id)
	})

	closeModal()
}


async function handleAuthorDelete(authorID) {
	try {
		await deleteAuthor(authorID)
		await removeFiles(authorID)
		authors.value = await getAuthors()
		authors.value.forEach(async(author) => {
			author.photoes = await getFileById(author._id)
		})		
	} catch (error) {
		console.log(error);
	}

}


function openModal() {
	modalTitle.value = 'Добавить автора'
	modalShow.value = true	
}

function closeModal() {
	modalShow.value = false
	editedAuthor.value = {}	
	fileHandler.selectedFile.value = null
	authorFileInput.value.value = null
}

onBeforeMount(async() => {
	authors.value = await getAuthors()
	authors.value.forEach(async(author) => {
		author.photoes = await getFileById(author._id)
	})
})
</script>

<template>
	<Modal v-model:modalShow="modalShow">
		<template v-slot:modalButton>
			<div  v-if="user.role === 'admin'" class="d-flex justify-content-center ">
				<button type="button" @click="openModal" class="btn btn-primary w-50">
					Добавить автора
				</button>		
			</div>
		</template>
		<template v-slot:modalHeader>
			<h1 class="modal-title fs-5" id="staticBackdropLabel">{{ modalTitle }}</h1>
			<button type="button" class="btn-close" @click="closeModal">Закрыть</button>
		</template>
		<template v-slot:modalBody>
			<form class="p-2 border border-2 border-primary rounded">
				<Input type="text" inputID="name" label="Имя автора" v-model:model="editedAuthor.name" class="w-100 form-control fs-5"/>
				<input type="file" ref="authorFileInput" name="image" @change="fileHandler.handleFileChange">
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="handleAuthorCreate" class="btn btn-primary">
				Добавить автора
			</button>
			<button @click.prevent="editedAuthor = {}" class="btn btn-outline-primary">
				Очистить
			</button>			
		</template>
	</Modal>
	<section class="row row-cols-3 my-4 border mx-0 border-primary border-2 rounded">
		<div v-for="author in authors" :key="author._id"  class="col d-flex flex-column justify-content-between align-items-center border border-primary" >
				<RouterLink :to="`/authors/${author._id}/books`" :key="author._id" class="fs-4 text-center">
					<img v-for="photo in author.photoes" :src="`${Backend_URL}/${photo.file_storage_link}`" :key="photo._id" class="w-100"/>
					<p>{{author.name}}</p>
				</RouterLink>
				<button  v-if="user.role === 'admin'" @click.prevent="async () => await handleAuthorDelete(author._id)" class="btn btn-danger">Удалить автора</button>			
		</div>
	</section>
</template>