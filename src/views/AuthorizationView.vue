<script setup>
import {ref} from 'vue'

import { signin, signup } from '../requests/auth.js';

import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/useAuthStore.js';
import { useRouter } from 'vue-router'

let { user } = storeToRefs(useAuthStore())

const router = useRouter()

let userData = ref({})
let registration = ref(false)

async function handleSignIn(userData) {
	if(!userData.login || !userData.password) {
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
	if(!userData.login || !userData.password || !userData.nickName) {
		return
	}		
	let data = await signup(userData)
	if(data) {
		user.value = data.user
		document.cookie = `token=${data.token}`
		console.log(data.msg)
		router.push({path: '/'})
	}
}
</script>

<template>
	<form class="p-2 border border-2 border-primary rounded ">
		<label class="d-block">
			<p class="m-1">Почта:</p>
			<input type="email" v-model.trim="userData.login" class="w-100 form-control fs-5" />              
		</label>
		<label v-if="registration" class="d-block">
			<p class="m-1">Никнейм:</p>
			<input type="email" v-model.trim="userData.nickName" class="w-100 form-control fs-5" />              
		</label>
		<label class="d-block">
			<p class="m-1">Пароль:</p>
			<input type="password" v-model.trim="userData.password" class="w-100 form-control fs-6" /> 
		</label>
	</form>
	<div class="w-100 d-flex justify-content-between">
		<button @click.prevent="async() => {
			registration ? await handleSignUp(userData) : await handleSignIn(userData)
			userData = {}
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
			registration = false
			userData = {}
		}">Войти</span></p>
	</div>
</template>