<script setup>
import { usePostsStore } from '../stores/PostsStore';

let { postDelete } = usePostsStore()

defineProps({
	post: Object,
})
</script>

<template>
	<li>
		<h2>{{post.title}}</h2>
		<p>{{post.body}}</p>
		<button @click.prevent="() => postDelete(post.id)">Удалить пост</button>
	</li>
</template>