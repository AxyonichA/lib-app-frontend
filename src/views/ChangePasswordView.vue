<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { changeUserPassword } from '../requests/usersReq.js'

let { user } = useAuthStore()
let oldPassword = ref('')
let newPassword = ref('')
let repeatedNewPassword = ref('')

async function handlePasswordChange() {
	if(!oldPassword.value || !newPassword.value || !repeatedNewPassword.value) {
		return
	}
	newPassword.value === repeatedNewPassword.value ? await changeUserPassword(user.id, oldPassword.value, newPassword.value) : alert('Новые пароли не соответствуют')
}
</script>

<template>
	<form class="p-2 border border-2 border-primary rounded">
		<label class="d-block">
			<p>Старый пароль:</p>
			<input type="text" v-model.trim="oldPassword" class="form-control">
		</label>
		<label class="d-block">
			<p>Новый пароль:</p>
			<input type="text" v-model.trim="newPassword" class="form-control">
		</label>
		<label class="d-block">
			<p>Повторите новый пароль:</p>
			<input type="text" v-model.trim="repeatedNewPassword" class="form-control">
		</label>
		<div class="mt-3">
			<button @click.prevent="async() => {
				await handlePasswordChange()
			}" class="btn btn-primary">
				Обновить пароль
			</button>				
		</div>
	</form>
</template>