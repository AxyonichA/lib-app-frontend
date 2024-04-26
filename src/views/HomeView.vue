<script setup>
import { onBeforeMount } from "vue"

import AddPostFormModal from "../components/AddPostFormModal.vue"
import PostList from "../components/PostList.vue"

import { usePostsStore } from '../stores/PostsStore'
import UpdatePostFormModal from '../components/UpdatePostFormModal.vue'

let { getPosts, clearPostAddForm } = usePostsStore()

onBeforeMount(() => {
	getPosts()
})
</script>

<template>
	<div class="d-flex justify-content-center ">
		<button type="button" @click="clearPostAddForm" class="btn btn-primary w-50" data-bs-toggle="modal" data-bs-target="#addPostModal">
			Добавить пост
		</button>		
	</div>

	<AddPostFormModal></AddPostFormModal>
	<PostList>
		<UpdatePostFormModal :parent="'home'"></UpdatePostFormModal>
	</PostList>
</template>
