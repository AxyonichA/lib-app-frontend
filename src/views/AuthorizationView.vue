<script setup>
import {ref} from 'vue'

import {authorizate, registrate } from '../requests/auth.js';

let userData = ref({})
let registration = ref(false)
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
		<button v-if="!registration" @click.prevent="async() => {
			if(userData.login === '' || userData.password === '') {
				return
			}
			data = await authorizate(userData)
			console.log(data)
			userData = {}
		}" class="btn btn-primary">
			{{registration ? 'Зарегистрироваться' : 'Войти'}}
		</button>
		<button v-if="registration" @click.prevent="async() => {
			if(!userData.login || !userData.password || !userData.nickName) {
				return
			}
			let data = await registrate(userData)
			console.log(data)
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