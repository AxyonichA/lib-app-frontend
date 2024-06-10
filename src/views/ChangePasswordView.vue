<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

import Input from '../components/Input.vue'

import useVuelidate from '@vuelidate/core'

import { changeUserPassword } from '../requests/usersReq.js'
import { clearAllCookies } from '../services/cookies.js'
import { getRules } from '../services/vuelidate.js'

import { useAuthStore } from '../stores/useAuthStore';
import { storeToRefs } from 'pinia'

let { user } = storeToRefs(useAuthStore())  

let router = useRouter()

const passwordFields = ref({
	oldPassword: "",
	newPassword: "",
	passwordConfirm: ""
})

async function handlePasswordChange() {
	try {
		let validationResult = await v$.value.$validate()
		if(validationResult) {
			await changeUserPassword(user.value._id, passwordFields.value)	
			clearAllCookies()
			user.value = null
			passwordFields.value = {}
			router.push({path: '/authorization'})			
		} else {
			return
		}		
	} catch (err) {
		console.log(err);
	}
}

function handleInputTouch(model) {
	v$.value[model].$touch()
}

const v$ = useVuelidate(getRules(passwordFields.value), passwordFields)
</script>

<template>
	<form class="p-2 border border-2 border-primary rounded">
		<Input type="text" label="Старый пароль" inputID="oldPassword" class="form-control" :error="v$.oldPassword.$error" :errors="v$.oldPassword.$errors" @touch="handleInputTouch" v-model:model="passwordFields.oldPassword"/>
		<Input type="text" label="Новый пароль" inputID="newPassword" class="form-control" :error="v$.newPassword.$error" :errors="v$.newPassword.$errors" @touch="handleInputTouch" v-model:model="passwordFields.newPassword"/>
		<Input type="text" label="Повторите новый пароль" inputID="passwordConfirm" class="form-control" :error="v$.passwordConfirm.$error" :errors="v$.passwordConfirm.$errors" @touch="handleInputTouch" v-model:model="passwordFields.passwordConfirm"/>
		<div class="mt-3">
			<button @click.prevent="handlePasswordChange" class="btn btn-primary">
				Обновить пароль
			</button>				
		</div>
	</form>
</template>