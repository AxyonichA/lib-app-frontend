<script setup>
import { onBeforeMount, ref } from 'vue'
import Modal from '../components/Modal.vue';

import { getUsers, deleteUser, updateUser } from '../requests/usersReq.js'

let modalTitle = ref('')
let modalShow = ref(false)

let users = ref([])
let editedUser = ref({})
let editedUserOrigin = ref({})

async function handleUpdateUser() {
	if(!editedUser.value.nickName || !editedUser.value.login || !editedUser.value.role) {
		console.log('One or more fields are empty!')
		return
	}
	await updateUser(editedUser.value)
	users.value = await getUsers()
	editedUser.value = {}
	editedUserOrigin.value = {}
	modalShow.value = false
}

onBeforeMount(async() => {
	try {
		users.value = await getUsers() 		
	} catch (err) {
		console.log(err)
	}
})
</script>

<template>
	
	<Modal v-model:modalShow="modalShow">
		<!-- <template v-slot:modalButton>
			<div class="d-flex justify-content-center ">
				<button type="button" @click="() => {
					modalTitle = 'Добавить пользователя'
					modalShow = true
				}" class="btn btn-primary w-50">
					Добавить пользователя
				</button>		
			</div>
		</template> -->
		<template v-slot:modalHeader>
			<h1 class="modal-title fs-5" id="staticBackdropLabel">{{ modalTitle }}</h1>
			<button type="button" class="btn-close" @click="() => {
				modalShow = false
				editedUser = {}
				editedUserOrigin = {}
			}">Закрыть</button>
		</template>
		<template v-slot:modalBody>
			<form class="p-2 border border-2 border-primary rounded ">
				<label class="d-block">
					<p class="m-1">Имя пользователя:</p>
					<input type='text' v-model.trim="editedUser.nickName" class="w-100 form-control fs-5" />              
				</label>
				<label class="d-block">
					<p class="m-1">Почта:</p>
					<input type='text' v-model.trim="editedUser.login" class="w-100 form-control fs-5" />              
				</label>
				<label class="d-block">
					<p class="m-1">Роль:</p>
					<input type='text' v-model.trim="editedUser.role" class="w-100 form-control fs-5" />              
				</label>
				<label class="d-block">
					<p class="m-1">Идентификатор:</p>
					<input type='text' v-model.trim="editedUser.id" disabled class="w-100 form-control fs-5" />              
				</label>
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async() => {
				await handleUpdateUser()
			}" class="btn btn-primary">
				Сохранить
			</button>
			<button @click.prevent="() => {
				editedUser = {...editedUserOrigin}
			}" class="btn btn-outline-primary">
				Очистить
			</button>			
		</template>
	</Modal>	
	<section v-for="user in users" :key="user.id" class="row my-3 border mx-0 border-primary border-2 rounded">
		<div class="d-flex justify-content-between align-items-center ">
			<div class="d-flex flex-column ">
				<span>{{ user.nickName }}</span>
				<span>{{ user.login }}	</span>			
				<span>{{ user.role }}	</span>					
			</div>
			<div>
				<button @click.prevent="async () => {
					editedUser = {...user}
					editedUserOrigin = {...user}
					modalShow = true
					modalTitle = 'Редактировать данные пользователя'
				}" class="btn btn-secondary">Редактировать</button>			
				<button @click.prevent="async () => {
					await deleteUser(user.id)
					users = await getUsers()
				}" class="btn btn-danger">Удалить пользователя</button>					
			</div>
	
		</div>
	</section>
</template>