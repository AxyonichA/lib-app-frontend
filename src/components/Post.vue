<script setup>
import { usePostsStore } from '../stores/PostsStore';
import { useAuthorsStore } from '../stores/AuthorsStore'
import { useRoute } from 'vue-router'
let route = useRoute()
// let {name} = route.params
let {id} = route.params
let { postDelete, getPosts } = usePostsStore()
let { getAuthorPosts } = useAuthorsStore()
defineProps({
	post: Object,
})
</script>

<template>
		<article class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>
			<button v-if="!id" @click.prevent="async () => {
				await postDelete(post.id)
				await getPosts()
			}" class="btn btn-secondary">Удалить пост</button>
			<button v-if="id" @click.prevent="async () => {
				await postDelete(post.id)
				await getAuthorPosts(id)
			}" class="btn btn-secondary">Удалить пост</button>
		</article>
</template>