<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/PostsStore'

let { postAdd, clearPostAddForm } = usePostsStore()
let { postTitle, postBody, postAuthor } = storeToRefs(usePostsStore())

</script>

<template>
	<div class="modal fade" id="addPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">Новый пост</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form class="p-2 border border-2 border-primary rounded ">
						<label class="d-block">
							<p class="m-1">Заголовок:</p>
							<input type='text' v-model.trim="postTitle" class="w-100 form-control fs-5" />              
						</label>
						<label class="d-block">
							<p class="m-1">Текст:</p>
							<textarea v-model.trim="postBody" class="w-100 form-control fs-6" rows="10"/>               
						</label>
						<label class="d-block">
							<p class="m-1">Автор:</p>
							<input type="text" v-model.trim="postAuthor" class="w-100 form-control fs-5"/>               
						</label>
					</form>
				</div>
				<div class="modal-footer d-flex justify-content-between mt-3">
					<button @click.prevent="postAdd" class="btn btn-primary" data-bs-dismiss="modal">
						Запостить
					</button>
					<button @click.prevent="clearPostAddForm" class="btn btn-outline-primary" data-bs-dismiss="modal">
						Отмена
					</button>
				</div>
			</div>
		</div>
	</div>
</template>