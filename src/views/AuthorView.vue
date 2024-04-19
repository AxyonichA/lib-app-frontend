<script setup>
import { onBeforeMount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import PostList from "../components/PostList.vue"
import { usePostsStore } from '../stores/PostsStore'
import { useAuthorsStore } from '../stores/AuthorsStore'
import { useRoute } from 'vue-router'

let { getAuthor } = useAuthorsStore()
let {posts} = storeToRefs(usePostsStore())
let route = useRoute()
let {name} = route.params

onBeforeMount(() => {
	getAuthor(name)
})
</script>

<template>
	<h1>{{$route.params.name}}</h1>
	<PostList v-if="posts.length !== 0"></PostList>
	<p v-if="posts.length === 0">У данного автора ещё нет публикаций</p>
</template>