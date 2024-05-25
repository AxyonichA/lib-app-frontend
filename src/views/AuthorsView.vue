<script setup>
import { onBeforeMount, ref } from "vue"
import { RouterLink } from 'vue-router'

import Modal from '../components/Modal.vue'
import Input from '../components/Input.vue';
import { getAuthors, createAuthor, deleteAuthor } from '../requests/authorReq';

let authors = ref([])
let editedAuthor = ref('')
let modalTitle = ref('')
let modalShow = ref(false)

onBeforeMount(async() => {
	authors.value = await getAuthors()
})
</script>

<template>


	<Modal v-model:modalShow="modalShow">
		<template v-slot:modalButton>
			<div class="d-flex justify-content-center ">
				<button type="button" @click="() => {
					modalTitle = 'Добавить автора'
					modalShow = true
				}" class="btn btn-primary w-50">
					Добавить автора
				</button>		
			</div>
		</template>
		<template v-slot:modalHeader>
			<h1 class="modal-title fs-5" id="staticBackdropLabel">{{ modalTitle }}</h1>
			<button type="button" class="btn-close" @click="() => {
				modalShow = false
				editedAuthor = ''
			}">Закрыть</button>
		</template>
		<template v-slot:modalBody>
			<form class="p-2 border border-2 border-primary rounded ">
				<Input type="text" label="Имя автора" v-model:model="editedAuthor" class="w-100 form-control fs-5"/>
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async () => {
				if(!editedAuthor) {
					return
				}
				await createAuthor(editedAuthor)
				authors = await getAuthors()
				editedAuthor = ''
				modalShow = false
			}" class="btn btn-primary">
				Добавить автора
			</button>
			<button @click.prevent="() => {
				editedAuthor = ''
			}" class="btn btn-outline-primary">
				Очистить
			</button>			
		</template>
	</Modal>	
	<section v-for="author in authors" :key="author.id" class="row my-4 border mx-0 border-primary border-2 rounded">
		<div class="d-flex justify-content-between align-items-center ">
				<RouterLink :to="`/authors/${author.id}/books`" :key="author.id" class="fs-4">{{author.name}}</RouterLink>
				<button @click.prevent="async () => {
					await deleteAuthor(author.id)
					authors = await getAuthors()
				}" class="btn btn-danger">Удалить автора</button>			
		</div>
	</section>
</template>