<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router';

import EditPostForm from '../components/EditPostForm.vue'
import PostList from "../components/PostList.vue"

import { getAuthors, getAuthorBooks } from '../requests/authorReq';


let route = useRoute()
let {authorId} = route.params

let books = ref([])
let editedBook = ref({})

let authors = ref([])

let modalTitle = ref('')
let modalShow = ref(false)

let name = ''

onBeforeMount(async() => {
	[books.value, name] = await getAuthorBooks(authorId)
	authors.value = await getAuthors()
})
</script>

<template>
	<EditPostForm :authors="authors"  :authorId="authorId" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedBook="editedBook" v-model:books="books"/>
	<h1>{{ name }}</h1>
	<PostList v-if="books.length !== 0"  v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedBook="editedBook" v-model:books="books"/>
	<p v-if="books.length === 0">У данного автора ещё нет публикаций</p>
</template>