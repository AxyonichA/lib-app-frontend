<script setup>
import { ref } from 'vue'

</script>

<template>
	<header class="d-flex w-100 p-4 position-relative ">
		<nav class="d-flex flex-grow-1 gap-4 justify-content-center fs-5 ">
			<RouterLink to="/" class="">Home</RouterLink>
			<RouterLink to="/authors" class="">Authors</RouterLink>
		</nav>
		<button type="button" class="btn btn-bs-white border border-1 border-primary position-absolute end-0 align-self-center translate-middle-x">
			<RouterLink to="/authorization" class="">Войти</RouterLink>
		</button>		
	</header>
	<main class="container">
		<RouterView />		
	</main>

</template>
