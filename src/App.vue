<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue"
import { usePostsStore } from './stores/PostsStore'

let { getPosts } = usePostsStore()
onMounted(() => {
	getPosts()
})
</script>

<template>
	<header>
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/authors">Authors</RouterLink>
		</nav>
	</header>

	<RouterView />
</template>
