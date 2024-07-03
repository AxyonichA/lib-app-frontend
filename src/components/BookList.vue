<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'

import { useAuthStore } from '../stores/useAuthStore';

import Book from './Book.vue'
import Modal from './Modal.vue';
import Input from './Input.vue'

import useFileChangeHandler from '../composables/useFileChangeHandler'

import { getBooks, bookDelete, bookAdd, bookUpdate } from '../requests/booksReq';
import { getAuthorBooks, getAuthors } from '../requests/authorReq';
import { getFilesByEntityID, removeFilesByEntityID, uploadFiles } from '../requests/fileReq'

const Backend_URL = import.meta.env.VITE_BACKEND_PORT_ADDRESS
const fileHandler = useFileChangeHandler('books', 'book-photo')

let route = useRoute()
let {authorId} = route.params

const { user } = useAuthStore()


const books = ref([])
const authors = ref([])

const editedBook = ref({})

let modalTitle = ref('')
let modalShow = ref(false)

const bookFileInput = ref(null)

async function handleBookEdit() {
	try {
		if(!editedBook.value.title || !editedBook.value.body || !editedBook.value.authorID) {
			return
		}
		let searchedAuthor = authors.value.find((author) => author._id == editedBook.value.authorID)

		editedBook.value.authorName = searchedAuthor.fullname

		if(editedBook.value._id) {
			await bookUpdate(editedBook.value)
			fileHandler.selectedFiles.value.options.entity_id = editedBook.value._id
			await uploadFiles(editedBook.value._id, fileHandler.selectedFiles.value)
		} else {
			const createdBookID = await bookAdd(editedBook.value)
			fileHandler.selectedFiles.value.options.entity_id = createdBookID
			await uploadFiles(createdBookID, fileHandler.selectedFiles.value)
		} 
		books.value = authorId ? await getAuthorBooks(authorId) : await getBooks()
		books.value.forEach(async(book) => {
			book.photoes = await getFilesByEntityID(book._id)
		})

		closeModal()	
	} catch (err) {
		console.log(err);
	}

}

async function handleBookDelete(book, authorId) {
	await bookDelete(book._id);
	await removeFilesByEntityID(book._id)
	//books refresh >>> 
	books.value = authorId ? (await getAuthorBooks(authorId)) : await getBooks()
	books.value.forEach(async(book) => {
		book.photoes = await getFilesByEntityID(book._id)
	})		
}

function handleImageSelect(fileID, e) {
	e.target.checked === true ? fileHandler.editedFiles.value.add(fileID) : fileHandler.editedFiles.value.delete(fileID)
}

async function handleImagesDelete() {
	fileHandler.handleFilesDelete(editedBook.value._id)
	// files refresh >>>
	const files = await getFilesByEntityID(editedBook.value._id)
	editedBook.value.photoes = files
	books.value.map((book) => {
		if(book._id === editedBook.value._id) {
			book.photoes = files
		}
	})
}

function handleChangeBookClick(book) {
	editedBook.value = {...book}
	modalTitle.value = 'Редактировать книгу'
	modalShow.value = true
}

function openModal() {
	if(authorId) {
		editedBook.value.authorID = authorId
	}
	modalTitle.value = 'Добавить книгу'
	modalShow.value = true	
}
function closeModal() {
	modalShow.value = false
	editedBook.value= {}
	fileHandler.selectedFiles.value = null
	bookFileInput.value.value = null;
}

onBeforeMount(async() => {
	books.value = authorId ? await getAuthorBooks(authorId) : await getBooks()
	books.value.forEach(async(book) => {
			book.photoes = await getFilesByEntityID(book._id)
		})	
	authors.value = await getAuthors()
})
</script>


<template>
	<Modal v-if="user.role === 'admin'" v-model:modalShow="modalShow">
		<template v-slot:modalButton>
			<div class="d-flex justify-content-center ">
				<button type="button" @click="openModal" class="btn btn-primary w-50">
					Добавить книгу
				</button>		
			</div>
		</template>
		<template v-slot:modalHeader>
			<h1 class="modal-title fs-5" id="staticBackdropLabel">{{ modalTitle }}</h1>
			<button type="button" class="btn-close" @click="closeModal">Закрыть</button>
		</template>
		<template v-slot:modalBody>
			<form class="p-2 border border-2 border-primary rounded">
				<Input type="text" label="Заголовок" inputID="Заголовок" v-model:model="editedBook.title" class="w-100 form-control fs-5" />
				<label class="d-block">
					<p class="m-1">Текст:</p>
					<textarea v-model.trim="editedBook.body" class="w-100 form-control fs-6" rows="10"/>               
				</label>
				<label class="d-block">
					<p class="m-1">Имя автора:</p>
					<select @change="(e) => editedBook.authorID = e.target.value" :disabled="authorId && !editedBook._id ? true : false" class="form-select">
						<option v-if="!editedBook.authorID" selected>Выбрать автора:</option>
						<option v-for="author in authors" :value="author._id" :key="author._id" :selected="editedBook.authorID === author._id ? true : false">{{ author.fullname }}</option>
					</select>              
				</label>
				<div>
					<label v-for="photo in editedBook.photoes" :for="photo._id" :key="photo._id" class="position-relative w-50" >
						<input type="checkbox" :id="photo._id" :value="photo.file_storage_link" @change="handleImageSelect(photo._id, $event)" class="position-absolute end-0">
						<img :src="`${Backend_URL}/${photo.file_storage_link}`" class="w-50"/>						
					</label>
					<button @click.prevent="handleImagesDelete">Удалить выбранные изображения</button>
				</div>
				<input type="file" multiple ref="bookFileInput" @change="fileHandler.handleFileChange">
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="handleBookEdit" class="btn btn-primary">
				{{ editedBook._id ? 'Обновить' : 'Добавить книгу' }}
			</button>
			<button @click.prevent="() => {
				editedBook = {}
				bookFileInput.value = null;
			}" class="btn btn-outline-primary">
				Очистить
			</button>				
		</template>
	</Modal>
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<Book v-for="book in books" :book="book" @handleChangeBookClick="handleChangeBookClick" @handleBookDelete="handleBookDelete" :key="book.id" />
	</section>
</template>
