<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';

import { usePostsStore } from '../stores/PostsStore';
import { useAuthorsStore } from '../stores/AuthorsStore'

let { postDelete, getPosts } = usePostsStore()
let { getAuthorPosts } = useAuthorsStore()
let { postTitle, postBody, postAuthor, posts, currentPostId } = storeToRefs(usePostsStore())

let route = useRoute()
let {id} = route.params

defineProps({
	post: Object,
})

function handlePostUpdateClick(id) {
	let selectedPost = posts.value.find(post => post.id === id)
	postTitle.value = selectedPost.title
	postBody.value = selectedPost.body
	postAuthor.value = selectedPost.author
}
</script>

<template>
		<article class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>

			<button v-if="!id" @click.prevent="async () => {
				await postDelete(post.id)
				await getPosts()
			}" class="btn btn-danger">Удалить пост</button>

			<button v-if="id" @click.prevent="async () => {
				await postDelete(post.id)
				await getAuthorPosts(id)
			}" class="btn btn-danger">Удалить пост</button>

			<button @click="() => {
				currentPostId = post.id
				handlePostUpdateClick(post.id)
			}" class="btn btn-secondary mt-1 " data-bs-toggle="modal" data-bs-target="#updatePostModal">Редактировать</button>
		</article>
</template>