<script setup>
import { ref } from 'vue'

import Modal from './Modal.vue';
import Input from './Input.vue'

import useFileChangeHandler from '../composables/useFileChangeHandler';
import { useAuthStore } from '../stores/useAuthStore';


const { user } = useAuthStore()

const editedBook = defineModel('editedBook')
const modalShow = defineModel('modalShow')
const modalTitle = defineModel('modalTitle')

const bookFileInput = ref(null)
const fileHandler = useFileChangeHandler('books', 'book-photo')

const props = defineProps({
	authors: Array,
	authorId: String
})

defineEmits([
	"handleBookEdit",
	"handleAuthorBookEdit"
])

function openModal() {
	if(props.authorId) {
		editedBook.value.authorID = props.authorId
	}
	modalTitle.value = 'Добавить книгу'
	modalShow.value = true	
}
function closeModal() {
	modalShow.value = false
	editedBook.value= {}
}
</script>

<template>
	<Modal v-model:modalShow="modalShow">
		<template v-if="user.role === 'admin'" v-slot:modalButton>
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
				<Input type="text" label="Заголовок" v-model:model="editedBook.title" class="w-100 form-control fs-5" />
				<label class="d-block">
					<p class="m-1">Текст:</p>
					<textarea v-model.trim="editedBook.body" class="w-100 form-control fs-6" rows="10"/>               
				</label>
				<label class="d-block">
					<p class="m-1">Имя автора:</p>
					<select @change="(e) => editedBook.authorID = e.target.value" :disabled="authorId && !editedBook._id ? true : false" class="form-select">
						<option v-if="!editedBook.authorID" selected>Выбрать автора:</option>
						<option v-for="author in authors" :value="author._id" :key="author._id" :selected="editedBook.authorID === author._id ? true : false">{{ author.name }}</option>
					</select>              
				</label>
				<input type="file" ref="bookFileInput" @change="fileHandler.handleFileChange">
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async() => $emit(props.authorId ? 'handleAuthorBookEdit' : 'handleBookEdit', fileHandler.selectedFile.value, closeModal)" class="btn btn-primary">
				{{ editedBook._id ? 'Обновить' : 'Добавить книгу' }}
			</button>
			<button @click.prevent="() => editedBook = {}" class="btn btn-outline-primary">
				Очистить
			</button>				
		</template>
	</Modal>
</template>