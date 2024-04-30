<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';

import { usePostsStore } from '../stores/PostsStore';
import { useAuthorsStore } from '../stores/AuthorsStore'

let { postDelete, getPosts } = usePostsStore()
let { getAuthorPosts } = useAuthorsStore()
let { editedPost } = storeToRefs(usePostsStore())

let route = useRoute()
let {authorId} = route.params
defineProps({
	post: Object,
})

</script>

<template>
		<article class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>
			<span v-if="!authorId" class="ms-auto fs-3">{{ post.author }}</span>
			<button @click.prevent="async () => {
				await postDelete(post.id);
				authorId ? await getAuthorPosts(authorId) : await getPosts()
			}" class="btn btn-danger">Удалить пост</button>
			<button @click="() => editedPost = {...post}" class="btn btn-secondary mt-1 " data-bs-toggle="modal" data-bs-target="#modal">Редактировать</button>
		</article>
</template>