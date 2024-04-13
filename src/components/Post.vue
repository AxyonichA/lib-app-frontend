<script setup>
import { usePostsStore } from '../stores/PostsStore';

let { postDelete } = usePostsStore()

defineProps({
	post: Object,
})
</script>

<template>
		<article class="col d-flex flex-column p-3 text-center border" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>
			<button @click.prevent="() => postDelete(post.id)" class="btn btn-secondary">Удалить пост</button>
		</article>
</template>