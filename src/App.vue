<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/useAuthStore';
import { clearAllCookies } from './services/cookies'
import { useRouter } from 'vue-router'

const { user } = storeToRefs(useAuthStore())

const router = useRouter()
</script>

<template>
	<header class="d-flex w-100 p-4 position-relative ">
		<nav class="d-flex flex-grow-1 gap-4 justify-content-center fs-5 ">
			<RouterLink to="/" class="">Home</RouterLink>
			<RouterLink to="/authors" class="">Authors</RouterLink>
		</nav>
	
		<button v-if="!user"  type="button" class="btn btn-bs-white border border-1 border-primary position-absolute end-0 align-self-center translate-middle-x">
			<RouterLink to="/authorization" class="">Войти</RouterLink>
		</button>		
		<button v-if="user" @click="() => {
			console.log(user)
			user = undefined
			console.log(user)
			clearAllCookies()
			router.push('/authorization')
		}"  type="button" class="btn btn-bs-white border border-1 border-primary position-absolute end-0 align-self-center translate-middle-x">
			Выйти
		</button>			
	</header>
	<main class="container">
		<RouterView />		
	</main>

</template>
