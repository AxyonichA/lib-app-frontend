<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router';

import Modal from '../components/Modal.vue'
import PostList from "../components/PostList.vue"

import { postAdd, postUpdate } from '../requests/postsReq';
import { getAuthorPosts } from '../requests/authorReq';

let route = useRoute()
let {authorId} = route.params

let posts = ref([])
let editedPost = ref({})
let name = ''

onBeforeMount(async() => {
	[posts.value, name] = await getAuthorPosts(authorId)
})
</script>

<template>
	<div class="d-flex justify-content-center ">
		<button type="button" @click="() => {
			editedPost.userID = Number(authorId)
		}" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#modal">
			Добавить пост
		</button>		
	</div>
	<Modal>
		<template v-slot:form>
			<form class="p-2 border border-2 border-primary rounded ">
				<label class="d-block">
					<p class="m-1">Заголовок:</p>
					<input type='text' v-model.trim="editedPost.title" class="w-100 form-control fs-5" />              
				</label>
				<label class="d-block">
					<p class="m-1">Текст:</p>
					<textarea v-model.trim="editedPost.body" class="w-100 form-control fs-6" rows="10"/>               
				</label>
				<label class="d-block">
					<p class="m-1">Идентификатор автора:</p>
					<input type="text" v-model.trim.number="editedPost.userID" :disabled="editedPost.id ? false : true" class="w-100 form-control fs-5"/>               
				</label>
			</form>
		</template>
		<template v-slot:postEdit>
			<button @click.prevent="async () => {
				editedPost.id ? await postUpdate(editedPost) : await postAdd(editedPost, posts)
				editedPost = {}
				posts = (await getAuthorPosts(authorId))[0]
			}" class="btn btn-primary" data-bs-dismiss="modal">
				{{ editedPost.id ? 'Обновить' : 'Запостить' }}
			</button>
			<button @click.prevent="editedPost = {}" class="btn btn-outline-primary" data-bs-dismiss="modal">
				Отмена
			</button>
		</template>
	</Modal>
	<h1>{{ name }}</h1>
	<PostList v-model:editedPost="editedPost" v-model:posts="posts" v-if="posts.length !== 0" />
	<p v-if="posts.length === 0">У данного автора ещё нет публикаций</p>
</template>