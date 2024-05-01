<script setup>
import { defineModel } from 'vue';
import { useRoute } from 'vue-router'

import { getPosts, postDelete } from '../requests/postsReq';
import { getAuthorPosts } from '../requests/authorReq';

let route = useRoute()
let {authorId} = route.params
defineProps({
	post: Object,
})
const editedPost = defineModel('editedPost')
const posts = defineModel('posts')
const modalTitle = defineModel('modalTitle')
const modalShow = defineModel('modalShow')
</script>

<template>
		<article class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>
			<span v-if="!authorId" class="ms-auto fs-5">{{ post.authorName }}</span>
			<button @click.prevent="async () => {
				await postDelete(post.id);
				posts = authorId ? (await getAuthorPosts(authorId))[0] : await getPosts()
			}" class="btn btn-danger">Удалить пост</button>
			<button @click="() => {
				editedPost = {...post}
				modalTitle = 'Редактировать пост'
				modalShow = true
			}" class="btn btn-secondary mt-1 ">Редактировать</button>
		</article>
</template>