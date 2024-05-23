<script setup>
import { getBooks, bookAdd, bookUpdate } from '../requests/booksReq';
import { getAuthorBooks } from '../requests/authorReq';

import Modal from './Modal.vue';

const books = defineModel('books')
const editedBook = defineModel('editedBook')

const modalShow = defineModel('modalShow')
const modalTitle = defineModel('modalTitle')


const props = defineProps({
	authors: Array,
	authorId: String
})

async function handlePostEdit() {
	if(!editedBook.value.title || !editedBook.value.body || !editedBook.value.authorID) {
				return
		}
	editedBook.value.id ? await bookUpdate(editedBook.value) : await bookAdd(editedBook.value)
	editedBook.value = {}
	books.value = props.authorId ? (await getAuthorBooks(props.authorId))[0] : await getBooks()
	modalShow.value = false
}

function handleAddPostClick() {
	if(props.authorId) {
		editedBook.value.authorID = Number(props.authorId)				
	}
	modalTitle.value = 'Добавить книгу'
	modalShow.value = true	
}
</script>

<template>


	<Modal v-model:modalShow="modalShow">
		<template v-slot:modalButton>
			<div class="d-flex justify-content-center ">
				<button type="button" @click="handleAddPostClick" class="btn btn-primary w-50">
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
				<label class="d-block">
					<p class="m-1">Заголовок:</p>
					<input type='text' v-model.trim="editedBook.title" class="w-100 form-control fs-5" />              
				</label>
				<label class="d-block">
					<p class="m-1">Текст:</p>
					<textarea v-model.trim="editedBook.body" class="w-100 form-control fs-6" rows="10"/>               
				</label>
				<label class="d-block">
					<p class="m-1">Имя автора:</p>
					<select @change="(e) => editedBook.authorID = e.target.value" :disabled="authorId && !editedBook.id ? true : false" class="form-select">
						<option v-if="!editedBook.authorID" selected>Выбрать автора:</option>
						<option v-for="author in authors" :value="author.id" :key="author.id" :selected="editedBook.authorID === author.id ? true : false">{{ author.name }}</option>
					</select>              
				</label>
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async() => await handlePostEdit()" class="btn btn-primary">
				{{ editedBook.id ? 'Обновить' : 'Добавить книгу' }}
			</button>
			<button @click.prevent="() => editedBook = {}" class="btn btn-outline-primary">
				Очистить
			</button>				
		</template>
	</Modal>
</template>