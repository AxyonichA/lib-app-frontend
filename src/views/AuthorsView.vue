<script setup>
import { onBeforeMount, ref } from "vue"
import { RouterLink } from 'vue-router'

import useFileChangeHandler from '../composables/useFileChangeHandler.js';

const Backend_URL = import.meta.env.VITE_BACKEND_PORT_ADDRESS

import Modal from '../components/Modal.vue'
import Input from '../components/Input.vue';

import { getAuthors, createAuthor, deleteAuthor, updateAuthor, getAuthor } from '../requests/authorReq';
import { getFilesByEntityID, removeFilesByEntityID, uploadFiles } from '../requests/fileReq.js';
import { useAuthStore } from '../stores/useAuthStore';
const { user } = useAuthStore()

const authors = ref([])
let editedAuthor = ref({
	fullname: ''
})

let modalTitle = ref('')
let modalShow = ref(false)

const authorFileInput = ref(null)
const fileHandler = useFileChangeHandler('authors', 'author-photo')

const removeMatchingKeys = (obj1, obj2) => {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key] && key !== '_id') {
      delete obj1[key];
    }
  }
}

async function handleAuthorUpdate() {
	try {
		// removeMatchingKeys(editedAuthor.value, author.value)
		const result = await updateAuthor(editedAuthor.value)
		fileHandler.selectedFiles.value.options.entity_id = editedAuthor.value._id
		await uploadFiles(editedAuthor.value._id, fileHandler.selectedFiles.value)
		authors.value = await getAuthors()
		authors.value.forEach(async(author) => {
			if(author._id === editedAuthor.value._id) {
				author.photoes = await getFilesByEntityID(author._id)
			}
	})
		// authors.value.forEach(async(author) => {
		// 	if(author._id === editedAuthor.value._id) {
		// 		author = await getAuthor(author._id)		
		// 		author.photoes = await getFilesByEntityID(author._id)			
		// 	}
		// })
		closeModal()
	} catch (err) {
		console.log(err);
	}
}

async function handleAuthorCreate() {
	if(!editedAuthor.value.fullname || !fileHandler.selectedFiles.value) {
		return
	}

	const createdAuthorID = await createAuthor(editedAuthor.value)
	fileHandler.selectedFiles.value.options.entity_id = createdAuthorID
	
	await uploadFiles(createdAuthorID, fileHandler.selectedFiles.value)

	authors.value = await getAuthors()
	authors.value.forEach(async(author) => {
		author.photoes = await getFilesByEntityID(author._id)
	})

	closeModal()
}


async function handleAuthorDelete(authorID) {
	try {
		await deleteAuthor(authorID)
		await removeFilesByEntityID(authorID)
		authors.value = await getAuthors()
		authors.value.forEach(async(author) => {
			author.photoes = await getFilesByEntityID(author._id)
		})		
	} catch (error) {
		console.log(error);
	}

}

function handleAuthorEditClick(author) {
	editedAuthor.value = {...author}
	modalTitle.value = 'Редактировать данные автора'
	modalShow.value = true
}

function handleImageSelect(fileID, e) {
	e.target.checked === true ? fileHandler.editedFiles.value.add(fileID) : fileHandler.editedFiles.value.delete(fileID)
}

async function handleImagesDelete() {
	fileHandler.handleFilesDelete(editedAuthor.value._id)
	// files refresh >>>
	const files = await getFilesByEntityID(editedAuthor.value._id)
	editedAuthor.value.photoes = files
	authors.value.map((author) => {
		if(author._id === editedAuthor.value._id) {
			author.photoes = files
		}
	})
}

function openModal() {
	modalTitle.value = editedAuthor._id ? 'Редактировать данные автора' : 'Добавить автора'
	modalShow.value = true	
}

function closeModal() {
	modalShow.value = false
	editedAuthor.value = {}	
	fileHandler.selectedFiles.value.files = null
	authorFileInput.value.value = null
}

onBeforeMount(async() => {
	authors.value = await getAuthors()
	authors.value.forEach(async(author) => {
		author.photoes = await getFilesByEntityID(author._id)
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
				<Input type="text" inputID="fullname" label="Имя автора" v-model:model="editedAuthor.fullname" class="w-100 form-control fs-5"/>
				<Input type="text" inputID="birthDate" label="Дата рождения" class="w-100 form-control fs-5" v-model:model="editedAuthor.birthDate"/>
				<Input type="text" inputID="deathDate" label="Дата смерти" class="w-100 form-control fs-5" v-model:model="editedAuthor.deathDate"/>
				<Input type="text" inputID="birthPlace" label="Место рождения" class="w-100 form-control fs-5" v-model:model="editedAuthor.birthPlace"/>			
				<Input type="text" inputID="deathPlace" label="Место смерти" class="w-100 form-control fs-5" v-model:model="editedAuthor.deathPlace"/>
				<div>
					<label v-for="photo in editedAuthor.photoes" :for="photo._id" :key="photo._id" class="position-relative w-50" >
						<input type="checkbox" :id="photo._id" :value="photo.file_storage_link" @change="handleImageSelect(photo._id, $event)" class="position-absolute end-0">
						<img :src="`${Backend_URL}/${photo.file_storage_link}`" class="w-50"/>						
					</label>
					<button @click.prevent="handleImagesDelete">Удалить выбранные изображения</button>
				</div>
				<input type="file" multiple ref="authorFileInput" name="image" @change="fileHandler.handleFileChange">
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async() => editedAuthor._id ? await handleAuthorUpdate() : await handleAuthorCreate()" class="btn btn-primary">
				{{ editedAuthor._id ? 'Редактировать' : 'Добавить автора'}}
			</button>
			<button @click.prevent="editedAuthor = {}" class="btn btn-outline-primary">
				Очистить
			</button>			
		</template>
	</Modal>
	<section class="row row-cols-3 my-4 border mx-0 border-primary border-2 rounded">
		<div v-for="author in authors" :key="author._id"  class="col d-flex flex-column justify-content-between align-items-center border border-primary" >
				<RouterLink :to="`/authors/${author._id}`" :key="author._id" class="fs-4 text-center">
					<img v-for="photo in author.photoes" :src="`${Backend_URL}/${photo.file_storage_link}`" :key="photo._id" class="w-100"/>
					<p>{{author.fullname}}</p>
				</RouterLink>
				<button v-if="user.role === 'admin'" @click.prevent="() => handleAuthorEditClick(author)" class="btn btn-secondary mt-1">Редактировать</button>
				<button  v-if="user.role === 'admin'" @click.prevent="async() => await handleAuthorDelete(author._id)" class="btn btn-danger">Удалить автора</button>			
		</div>
	</section>
</template>