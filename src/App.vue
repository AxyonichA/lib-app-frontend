<script setup>
import { useRouter } from 'vue-router'

import { clearAllCookies } from './services/cookies'

import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/useAuthStore';
const { user } = storeToRefs(useAuthStore())

const router = useRouter()

function handleUserUnlogin() {
	user.value = null
	clearAllCookies()
	router.push('/authorization')
}
</script>

<template>
	<header class="d-flex w-100 p-4 position-relative ">
		<nav class="d-flex flex-grow-1 gap-4 justify-content-center fs-5 ">
			<RouterLink to="/" class="">Home</RouterLink>
			<RouterLink to="/authors" class="">Authors</RouterLink>
			<RouterLink to="/profile" class="">Profile</RouterLink>
			<RouterLink v-if="user?.role === 'admin'" to="/admin" class="">Admin</RouterLink>
		</nav>
	
		<button v-if="!user" type="button" class="btn btn-bs-white border border-1 border-primary position-absolute end-0 align-self-center translate-middle-x">
			<RouterLink to="/authorization" class="">Войти</RouterLink>
		</button>		
		<button v-if="user" @click="handleUserUnlogin" type="button" class="btn btn-bs-white border border-1 border-primary position-absolute end-0 align-self-center translate-middle-x">
			Выйти
		</button>			
	</header>
	<main class="container">
		<RouterView />		
	</main>

</template>

<style>
#app {
	min-height: 100vh;
	background-image: linear-gradient(to right,#D5AA72,#e68c0e);
}
</style>