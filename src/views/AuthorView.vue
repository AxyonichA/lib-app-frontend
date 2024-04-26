<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import UpdatePostFormModal from '../components/UpdatePostFormModal.vue'
import PostList from "../components/PostList.vue"

import { usePostsStore } from '../stores/PostsStore'
import { useAuthorsStore } from '../stores/AuthorsStore'

let { getAuthorPosts } = useAuthorsStore()
let {authorName} = storeToRefs(useAuthorsStore())
let {posts} = storeToRefs(usePostsStore())

let route = useRoute()
let {id} = route.params

onBeforeMount(() => {
	getAuthorPosts(id)
})
</script>

<template>
	<h1>{{ authorName }}</h1>
	<PostList v-if="posts.length !== 0">
		<UpdatePostFormModal :parent="'author'"></UpdatePostFormModal>
	</PostList>
	<p v-if="posts.length === 0">У данного автора ещё нет публикаций</p>
</template>