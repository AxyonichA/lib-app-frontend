<script setup>
import {computed, ref} from 'vue'

import { signin, signup } from '../requests/auth.js';

import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/useAuthStore.js';
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required, requiredIf, sameAs } from '@vuelidate/validators'

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
	const validationResult = await v$.value.$validate()
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
const rules = computed(() => {
	return {
		login: { 
			required: helpers.withMessage("Поле обязательно для заполнения", requiredIf(registration.value)), 
			email: helpers.withMessage("Укажите корректный почтовый адрес", email)
		},
		nickName: { 
			required: helpers.withMessage("Поле обязательно для заполнения", required), 
			minLength: helpers.withMessage("Длина выбираемого никнейма должна быть не менее 5 символов", minLength(5)), 
			maxLength: helpers.withMessage("Длина выбираемого никнейма должна быть не более 20 символов", maxLength(20))
		},
		password: { 
			required: helpers.withMessage("Поле обязательно для заполнения", required),
			minLength: helpers.withMessage("Длина вашего пароля должна быть не менее 5 символов", minLength(5)), 
			maxLength: helpers.withMessage("Длина вашего пароля должна быть не более 20 символов", maxLength(20)),
			regEx: helpers.withMessage("Пароль должен содержать хотя бы одну цифру, один строчный и один заглавный символ, специальный знак, и не содержать пробелов", helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )$/)) // Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.
		},
		passwordConfirm: { 
			required: helpers.withMessage("Поле обязательно для заполнения", required),
			sameAs: helpers.withMessage("Пароли должны совпадать", sameAs(userData.value.password))
		}
	}
})

const v$ = useVuelidate(rules, userData)
console.log(v$.value)
</script>

<template>
	<form class="p-2 border border-2 border-primary rounded ">
		<label class="d-block">
			<p class="m-1">Почта:</p>
			<input type="email" v-model.trim="userData.login" @blur="v$.login.$touch" class="w-100 form-control fs-5" />
			<div v-if="v$.login.$error" class="d-flex flex-column">
				<span v-for="error in v$.login.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
			</div>             
		</label>
		<label v-if="registration" class="d-block">
			<p class="m-1">Никнейм:</p>
			<input type="email" v-model.trim="userData.nickName" @blur="v$.nickName.$touch" class="w-100 form-control fs-5" />              
			<div v-if="v$.nickName.$error" class="d-flex flex-column">
				<span v-for="error in v$.nickName.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
			</div>  
		</label>
		<label class="d-block">
			<p class="m-1">Пароль:</p>
			<input type="password" v-model.trim="userData.password" @blur="v$.password.$touch"  class="w-100 form-control fs-6" /> 
			<div v-if="v$.password.$error && registration" class="d-flex flex-column">
				<span v-for="error in v$.password.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
			</div>  
		</label>
		<label v-if="registration" class="d-block">
			<p class="m-1">Повторите пароль:</p>
			<input type="password" v-model.trim="userData.passwordConfirm" @blur="v$.passwordConfirm.$touch"  class="w-100 form-control fs-6" /> 
			<div v-if="v$.passwordConfirm.$error && registration" class="d-flex flex-column">
				<span v-for="error in v$.passwordConfirm.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
			</div>  
		</label>
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