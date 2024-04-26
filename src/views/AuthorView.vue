<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import PostList from "../components/PostList.vue"

import { usePostsStore } from '../stores/PostsStore'
import { useAuthorsStore } from '../stores/AuthorsStore'

let { getAuthorPosts } = useAuthorsStore()
let {authorName} = storeToRefs(useAuthorsStore())
let {posts} = storeToRefs(usePostsStore())

let route = useRoute()
let {authorId} = route.params

onBeforeMount(() => {
	getAuthorPosts(authorId)
})
</script>

<template>
	<h1>{{ authorName }}</h1>
	<PostList v-if="posts.length !== 0">
	</PostList>
	<p v-if="posts.length === 0">У данного автора ещё нет публикаций</p>
</template>