<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<header class="d-flex w-100 p-4">
		<nav class="d-flex flex-grow-1 gap-4 justify-content-center fs-5 ">
			<RouterLink to="/" class="">Home</RouterLink>
			<RouterLink to="/authors" class="">Authors</RouterLink>
		</nav>
	</header>
	<main class="container">
		<RouterView />		
	</main>

</template>
