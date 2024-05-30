<script setup>
import { getBooks, bookAdd, bookUpdate } from '../requests/booksReq';
import { getAuthorBooks } from '../requests/authorReq';

import { useAuthStore } from '../stores/useAuthStore';

import Modal from './Modal.vue';
import Input from './Input.vue'

const { user } = useAuthStore()
const books = defineModel('books')
const editedBook = defineModel('editedBook')
const modalShow = defineModel('modalShow')
const modalTitle = defineModel('modalTitle')

const props = defineProps({
	authors: Array,
	authorId: String
})

async function handleBookEdit() {
	try {
		if(!editedBook.value.title || !editedBook.value.body || !editedBook.value.authorID) {
			return
		}
		let searchedAuthor = props.authors.find((author) => author._id == editedBook.value.authorID)
		editedBook.value.authorName = searchedAuthor.name
		if(editedBook.value._id) {
			await bookUpdate(editedBook.value)
		} else {
			await bookAdd(editedBook.value)
		}

		editedBook.value = {}
		books.value = props.authorId ? (await getAuthorBooks(props.authorId)) : await getBooks()
		modalShow.value = false		
	} catch (err) {
		console.log(err);
	}

}

function handleAddBookClick() {
	if(props.authorId) {
		editedBook.value.authorID = props.authorId
	}
	modalTitle.value = 'Добавить книгу'
	modalShow.value = true	
}
</script>

<template>


	<Modal v-model:modalShow="modalShow">
		<template v-if="user.role === 'admin'" v-slot:modalButton>
			<div class="d-flex justify-content-center ">
				<button type="button" @click="handleAddBookClick" class="btn btn-primary w-50">
					Добавить книгу
				</button>		
			</div>
		</template>
		<template v-slot:modalHeader>
			<h1 class="modal-title fs-5" id="staticBackdropLabel">{{ modalTitle }}</h1>
			<button type="button" class="btn-close" @click="() => {
				modalShow = false
				editedBook = {}
			}">Закрыть</button>
		</template>
		<template v-slot:modalBody>
			<form class="p-2 border border-2 border-primary rounded">
				<Input type="text" label="Заголовок" v-model:model="editedBook.title" class="w-100 form-control fs-5" />
				<label class="d-block">
					<p class="m-1">Текст:</p>
					<textarea v-model.trim="editedBook.body" class="w-100 form-control fs-6" rows="10"/>               
				</label>
				<label class="d-block">
					<p class="m-1">Имя автора:</p>
					<select @change="(e) => {
						editedBook.authorID = e.target.value
					}" :disabled="authorId && !editedBook._id ? true : false" class="form-select">
						<option v-if="!editedBook.authorID" selected>Выбрать автора:</option>
						<option v-for="author in authors" :value="author._id" :key="author._id" :selected="editedBook.authorID === author._id ? true : false">{{ author.name }}</option>
					</select>              
				</label>
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async() => await handleBookEdit()" class="btn btn-primary">
				{{ editedBook._id ? 'Обновить' : 'Добавить книгу' }}
			</button>
			<button @click.prevent="() => editedBook = {}" class="btn btn-outline-primary">
				Очистить
			</button>				
		</template>
	</Modal>
</template>