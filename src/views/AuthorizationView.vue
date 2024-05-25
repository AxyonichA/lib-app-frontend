<script setup>
import {computed, ref} from 'vue'

import { signin, signup } from '../requests/auth.js';
import Input from '../components/Input.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/useAuthStore.js';
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required, requiredIf, sameAs } from '@vuelidate/validators'

let { user } = storeToRefs(useAuthStore())

const router = useRouter()

let userData = ref({
	login: '',
	nickName: '',
	newPassword: '',
	passwordConfirm: ''
})
let registration = ref(false)

async function handleSignIn(userData) {
	if(!userData.login || !userData.oldPassword) {
		return
	}		
	let data = await signin(userData)
	if(data) {
		user.value = data.user
		console.log(user.value)
		document.cookie = `token=${data.token}`
		console.log(data.msg)
		router.push({path: '/'})
	}
}
async function handleSignUp(userData) {
	const validationResult = await v$.value.$validate()
	console.log(validationResult);
	if(validationResult) {
		let data = await signup(userData)
		userData.value = {}
		if(data) {
			user.value = data.user
			document.cookie = `token=${data.token}`
			console.log(data.msg)
			router.push({path: '/'})
		}		
	} else {
		return
	}
}

function handleInputTouch(model) {
	v$.value[model].$touch()
}

import { getRules } from '../services/vuelidate.js';
const v$ = useVuelidate(getRules(userData.value), userData)
</script>

<template>
	<form class="p-2 border border-2 border-primary rounded ">
		<Input type="email" label="Почта" inputID="login" class="form-control" :error="registration ? v$.login.$error : false" :errors="v$.login.$errors" @touch="handleInputTouch" v-model:model="userData.login"/>
		<Input v-if="registration" type="text" label="Никнейм" inputID="nickName" class="form-control" :error="v$.nickName.$error" :errors="v$.nickName.$errors" @touch="handleInputTouch" v-model:model="userData.nickName"/>
		<Input v-if="registration" type="password" label="Пароль" inputID="newPassword" class="form-control" :error="v$.newPassword.$error" :errors="v$.newPassword.$errors" @touch="handleInputTouch" v-model:model="userData.newPassword"/>
		<Input v-if="!registration" type="password" label="Пароль" inputID="oldPassword" class="form-control" @touch="handleInputTouch" v-model:model="userData.oldPassword"/>
		<Input v-if="registration" type="password" label="Пароль повторно" inputID="passwordConfirm" class="form-control" :error="v$.passwordConfirm.$error" :errors="v$.passwordConfirm.$errors" @touch="handleInputTouch" v-model:model="userData.passwordConfirm"/>
	</form>
	<div class="w-100 d-flex justify-content-between">
		<button @click.prevent="async() => {
			registration ? await handleSignUp(userData) : await handleSignIn(userData)
		}" class="btn btn-primary">
			{{registration ? 'Зарегистрироваться' : 'Войти'}}
		</button>
		<button @click.prevent="() => {
			userData = {}
		}" class="btn btn-outline-primary">
			Очистить
		</button>						
	</div>
	<div v-if="!registration" class="w-100 text-center ">
		<p>Нет аккаунта? <span class="text-primary" @click="() => {
			registration = true
		}">Зарегистрироваться</span></p>
	</div>
	<div v-if="registration" class="w-100 text-center ">
		<p>Уже есть аккаунт? <span class="text-primary" @click="() => {
			v$.$reset()
			registration = false
			userData = {}
		}">Войти</span></p>
	</div>
</template>