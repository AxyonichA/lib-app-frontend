<script setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/PostsStore'
import { ref } from 'vue'

let { postAdd, postUpdate, clearPostAddForm } = usePostsStore()
let { postTitle, postBody, posts } = storeToRefs(usePostsStore())
let selected = ref('addPost')
function handleSelectChange() {
	clearPostAddForm()
	if (selected.value === 'addPost') {
		return
	}
	let selectedPost = posts.value.find(post => post.id === selected.value)
	console.log(selectedPost)
	postTitle.value = selectedPost.title
	postBody.value = selectedPost.body
}
</script>

<template>
	<form class="p-2 border border-2 border-primary rounded ">
		<label class="d-block">
			<p class="m-1">Заголовок:</p>
			<input type='text' v-model.trim="postTitle" class="w-100 form-control fs-5" />              
		</label>
		<label class="d-block">
			<p class="m-1">Текст:</p>
			<textarea v-model.trim="postBody" class="w-100 form-control fs-6" rows="10"/>               
		</label>
		<div class="d-flex justify-content-between mt-3">
			<button v-if="selected === 'addPost'" @click.prevent="postAdd" class="btn btn-primary">
				Запостить
			</button>
			<button 
				v-if="selected !== 'addPost'" 
				@click.prevent="() => {
					postUpdate(selected)
					selected = 'addPost'
				}" 
				class="btn btn-primary"
			>
				Обновить
			</button>
			<select v-model="selected"  @change="handleSelectChange">
				<option value="addPost">Добавить пост</option>
				<option v-for="post in posts" :value="post.id">{{ post.title }}</option>
			</select>
			<button @click.prevent="clearPostAddForm" class="btn btn-outline-primary">
				Отмена
			</button>
		</div>
	</form>
</template>