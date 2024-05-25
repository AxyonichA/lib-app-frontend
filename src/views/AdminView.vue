<script setup>
import { onBeforeMount, ref } from 'vue'
import Modal from '../components/Modal.vue';
import Input from '../components/Input.vue';
import { getUsers, deleteUser, updateUser } from '../requests/usersReq.js'
import useVuelidate from '@vuelidate/core'
import { getRules } from '../services/vuelidate.js'

let modalTitle = ref('')
let modalShow = ref(false)

let users = ref([])
let editedUser = ref({
	login: '',
	nickName: "",
	role: '',
	id: ''
})
let editedUserOrigin = ref({})

async function handleUpdateUser() {
	let validationResult = await v$.value.$validate()
	if(validationResult) {
		await updateUser(editedUser.value)
		users.value = await getUsers()
		editedUser.value = {}
		editedUserOrigin.value = {}
		modalShow.value = false
	} else {
		return
	}

}

onBeforeMount(async() => {
	try {
		users.value = await getUsers() 		
	} catch (err) {
		console.log(err)
	}
})
function handleInputTouch(model) {
	v$.value[model].$touch()
}
const v$ = useVuelidate(getRules(editedUser.value), editedUser)
</script>

<template>
	
	<Modal v-model:modalShow="modalShow">
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
				<Input type="text" label="Имя пользователя" inputID="nickName" class="w-100 form-control fs-5" v-model:model="editedUser.nickName" :error="v$.nickName.$error" :errors="v$.nickName.$errors" @touch="handleInputTouch"/>
				<Input type="text" label="Почта" inputID="login" class="w-100 form-control fs-5" v-model:model="editedUser.login" :error="v$.login.$error" :errors="v$.login.$errors" @touch="handleInputTouch"/>
				<Input type="text" label="Роль" inputID="role" class="w-100 form-control fs-5" v-model:model="editedUser.role" :error="v$.role.$error" :errors="v$.role.$errors" @touch="handleInputTouch"/>
				<Input type="text" label="Идентификатор" :disabled="true" inputID="id" class="w-100 form-control fs-5" v-model:model="editedUser.id" />
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