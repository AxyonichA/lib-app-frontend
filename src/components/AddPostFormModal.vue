<script setup>
import { useRoute } from 'vue-router';

import { getPosts, postAdd, postUpdate } from '../requests/postsReq';
import { getAuthorPosts } from '../requests/authorReq';

let route = useRoute()
let {authorId} = route.params
</script>

<template>
	<div class="modal fade" id="addPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">Новый пост</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">Закрыть</button>
				</div>
				<div class="modal-body">
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
				</div>
				<div class="modal-footer d-flex justify-content-between mt-3">
					<button @click.prevent="async () => {
						editedPost.id ? await postUpdate(editedPost.id) : await postAdd()
						authorId ? await getAuthorPosts(authorId) : await getPosts()
					}" class="btn btn-primary" data-bs-dismiss="modal">
						{{ editedPost.id ? 'Обновить' : 'Запостить' }}
					</button>
					<button @click.prevent="clearPostAddForm" class="btn btn-outline-primary" data-bs-dismiss="modal">
						Отмена
					</button>
				</div>
			</div>
		</div>
	</div>
</template>