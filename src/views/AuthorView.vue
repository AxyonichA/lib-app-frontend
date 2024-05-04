<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router';

import EditPostForm from '../components/EditPostForm.vue'
import PostList from "../components/PostList.vue"

import { getAuthors, getAuthorPosts } from '../requests/authorReq';


let route = useRoute()
let {authorId} = route.params

let posts = ref([])
let editedPost = ref({})

let authors = ref([])

let modalTitle = ref('')
let modalShow = ref(false)

let name = ''

onBeforeMount(async() => {
	[posts.value, name] = await getAuthorPosts(authorId)
	authors.value = await getAuthors()
})
</script>

<template>
	<EditPostForm :authors="authors"  :authorId="authorId" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedPost="editedPost" v-model:posts="posts"/>
	<h1>{{ name }}</h1>
	<PostList v-if="posts.length !== 0"  v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedPost="editedPost" v-model:posts="posts"/>
	<p v-if="posts.length === 0">У данного автора ещё нет публикаций</p>
</template>