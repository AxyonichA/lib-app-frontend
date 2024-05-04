<script setup>
import { getPosts, postAdd, postUpdate } from '../requests/postsReq';
import { getAuthorPosts } from '../requests/authorReq';

import Modal from './Modal.vue';

const posts = defineModel('posts')
const editedPost = defineModel('editedPost')

const modalShow = defineModel('modalShow')
const modalTitle = defineModel('modalTitle')


const props = defineProps({
	authors: Array,
	authorId: String
})

async function handlePostEdit() {
	if(!editedPost.value.title || !editedPost.value.body || !editedPost.value.userID) {
				return
		}
	editedPost.value.id ? await postUpdate(editedPost.value) : await postAdd(editedPost.value)
	editedPost.value = {}
	posts.value = props.authorId ? (await getAuthorPosts(props.authorId))[0] : await getPosts()
	modalShow.value = false
}

function handleAddPostClick() {
	if(props.authorId) {
		editedPost.value.userID = Number(props.authorId)				
	}
	modalTitle.value = 'Добавить пост'
	modalShow.value = true	
}
</script>

<template>


	<Modal v-model:modalShow="modalShow">
		<template v-slot:modalButton>
			<div class="d-flex justify-content-center ">
				<button type="button" @click="handleAddPostClick" class="btn btn-primary w-50">
					Добавить пост
				</button>		
			</div>
		</template>
		<template v-slot:modalHeader>
			<h1 class="modal-title fs-5" id="staticBackdropLabel">{{ modalTitle }}</h1>
			<button type="button" class="btn-close" @click="() => {
				modalShow = false
				editedPost = {}
			}">Закрыть</button>
		</template>
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
				<label class="d-block">
					<p class="m-1">Имя автора:</p>
					<select @change="(e) => editedPost.userID = e.target.value" :disabled="authorId && !editedPost.id ? true : false" class="form-select">
						<option v-if="!editedPost.userID" selected>Выбрать автора:</option>
						<option v-for="author in authors" :value="author.id" :key="author.id" :selected="editedPost.userID === author.id ? true : false">{{ author.name }}</option>
					</select>              
				</label>
			</form>
		</template>
		<template v-slot:modalFooter>
			<button @click.prevent="async() => await handlePostEdit()" class="btn btn-primary">
				{{ editedPost.id ? 'Обновить' : 'Запостить' }}
			</button>
			<button @click.prevent="() => editedPost = {}" class="btn btn-outline-primary">
				Очистить
			</button>				
		</template>
	</Modal>
</template>