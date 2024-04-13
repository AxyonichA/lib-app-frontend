<script setup>
import { storeToRefs } from 'pinia';
import CommonButton from "./CommonButton.vue"
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
			<CommonButton :onclick="postAdd">
				Запостить
			</CommonButton>
			<CommonButton :onclick="clearPostAddForm">
				Отмена
			</CommonButton>
		</div>
	</form>
</template>