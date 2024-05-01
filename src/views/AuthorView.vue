<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router';

import Modal from '../components/Modal.vue'
import PostList from "../components/PostList.vue"

import { postAdd, postUpdate } from '../requests/postsReq';
import { getAuthors, getAuthorPosts } from '../requests/authorReq';

let route = useRoute()
let {authorId} = route.params

let posts = ref([])
let editedPost = ref({})
let name = ''
let modalTitle = ref('')
let modalShow = ref(false)
let authors = ref([])

onBeforeMount(async() => {
	[posts.value, name] = await getAuthorPosts(authorId)
	authors.value = await getAuthors()
})
</script>

<template>
	<div class="d-flex justify-content-center ">
		<button type="button" @click="() => {
			editedPost.userID = Number(authorId)
			modalTitle = 'Добавить пост'
			modalShow = true
		}" class="btn btn-primary w-50">
			Добавить пост
		</button>		
	</div>
	<Modal :title="modalTitle" v-model:modalShow="modalShow">
		<template v-slot:modalBody>
			<form class="p-2 border border-2 border-primary rounded ">
				<label class="d-block">
					<p class="m-1">Заголовок:</p>
					<input type='text' v-model.trim="editedPost.title" class="w-100 form-control fs-5" />              
				</label>
				<label class="d-block">
					<p class="m-1">Текст:</p>
					<textarea v-model.trim="editedPost.body" class="w-100 form-control fs-6" rows="10"/>               
				</label>
				<!-- <label class="d-block">
					<p class="m-1">Идентификатор автора:</p>
					<input type="text" v-model.trim.number="editedPost.userID" :disabled="editedPost.id ? false : true" class="w-100 form-control fs-5"/>               
				</label> -->
				<label class="d-block">
					<p class="m-1">Имя автора:</p>
					<select @change="(e) => editedPost.userID = e.target.value" :disabled="editedPost.id ? false : true" class="form-select">
						<option v-for="author in authors" :value="author.id" :key="author.id" :selected="editedPost.userID === author.id ? true : false">{{ author.name }}</option>
					</select>              
				</label>
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async () => {
				if(!editedPost.title || !editedPost.body || !editedPost.userID) {
					return
				}
				editedPost.id ? await postUpdate(editedPost) : await postAdd(editedPost, posts)
				editedPost = {}
				modalShow = false
				posts = (await getAuthorPosts(authorId))[0]
			}" class="btn btn-primary">
				{{ editedPost.id ? 'Обновить' : 'Запостить' }}
			</button>
			<button @click.prevent="editedPost = {}" class="btn btn-outline-primary">
				Очистить
			</button>
		</template>
	</Modal>
	<h1>{{ name }}</h1>
	<PostList v-if="posts.length !== 0" v-model:editedPost="editedPost" v-model:posts="posts" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" />
	<p v-if="posts.length === 0">У данного автора ещё нет публикаций</p>
</template>