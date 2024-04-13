<script setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/PostsStore'

let { postAdd, clearPostAddForm } = usePostsStore()
let { postTitle, postBody } = storeToRefs(usePostsStore())

</script>

<template>
	<form class="p-2 border border-2 border-primary rounded ">
		<label class="d-block">
			<p class="m-1">Заголовок:</p>
			<input type='text' v-model="postTitle" class="w-100 form-control fs-5" />              
		</label>
		<label class="d-block">
			<p class="m-1">Текст:</p>
			<textarea v-model="postBody" class="w-100 form-control fs-6" rows="10"/>               
		</label>
		<div class="d-flex justify-content-between mt-3">
			<button @click.prevent="postAdd" class="btn btn-primary">
				Запостить
			</button>
			<button @click.prevent="clearPostAddForm" class="btn btn-outline-primary">
				Отмена
			</button>
		</div>
	</form>
</template>