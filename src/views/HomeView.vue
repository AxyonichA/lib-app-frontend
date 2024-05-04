<script setup>
import { onBeforeMount, ref } from "vue"

import EditPostForm from '../components/EditPostForm.vue';
import PostList from "../components/PostList.vue"


import { getPosts } from '../requests/postsReq';
import { getAuthors } from '../requests/authorReq';

let posts = ref([])
let editedPost = ref({})

let authors = ref([])

let modalTitle = ref('')
let modalShow = ref(false)


onBeforeMount(async() => {
	posts.value = await getPosts()
	authors.value = await getAuthors()
})
</script>

<template>
	<EditPostForm :authors="authors" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow" v-model:editedPost="editedPost" v-model:posts="posts"/>
	<PostList v-model:editedPost="editedPost" v-model:posts="posts" v-model:modalTitle="modalTitle" v-model:modalShow="modalShow"/>
</template>
