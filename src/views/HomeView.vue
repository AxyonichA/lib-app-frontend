<script setup>
import { onBeforeMount } from "vue"
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/PostsStore'

import Modal from '../components/Modal.vue'
import PostList from "../components/PostList.vue"

let {editedPost} = storeToRefs(usePostsStore())
let { postAdd, getPosts, postUpdate, clearPostAddForm } = usePostsStore()

onBeforeMount(() => {
	getPosts()
})
</script>

<template>
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
					<input type="text" v-model.trim.number="editedPost.userID" class="w-100 form-control fs-5"/>               
				</label>
			</form>
		</template>
		<template v-slot:postEdit>
			<button @click.prevent="async () => {
				editedPost.id ? await postUpdate(editedPost.id) : await postAdd()
				await getPosts()
			}" class="btn btn-primary" data-bs-dismiss="modal">
				{{ editedPost.id ? 'Обновить' : 'Запостить' }}
			</button>
			<button @click.prevent="clearPostAddForm" class="btn btn-outline-primary" data-bs-dismiss="modal">
				Отмена
			</button>
		</template>
	</Modal>
	<div class="d-flex justify-content-center ">
		<button type="button" @click="clearPostAddForm" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#modal">
			Добавить пост
		</button>		
	</div>
	<PostList />
</template>
