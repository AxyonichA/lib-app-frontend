<script setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/PostsStore'

let { postAdd, clearPostAddForm } = usePostsStore()
let { postTitle, postBody } = storeToRefs(usePostsStore())

</script>

<template>
	<form>
		<label>
			<p>Название поста</p>
			<input type='text' v-model="postTitle"/>              
		</label>
		<label>
			<p>Содержимое</p>
			<textarea v-model="postBody" />               
		</label>
		<div>
			<button @click.prevent="postAdd">
				Запостить
			</button>
			<button @click.prevent="clearPostAddForm">
				Отмена
			</button>
		</div>
	</form>
</template>