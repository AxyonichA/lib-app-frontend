<script setup>
import { onBeforeMount, ref } from "vue"

import EditPostForm from '../components/EditPostForm.vue';
import PostList from "../components/PostList.vue"


import { getBooks } from '../requests/booksReq';
import { getAuthors } from '../requests/authorReq';

let books = ref([])
let editedBook = ref({})

let authors = ref([])

let modalTitle = ref('')
let modalShow = ref(false)


onBeforeMount(async() => {
	books.value = await getBooks()
	authors.value = await getAuthors()
})
</script>

<template>
	<EditPostForm :authors="authors" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedBook="editedBook" v-model:books="books"/>
	<PostList v-model:editedBook="editedBook" v-model:books="books" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow"/>
</template>
