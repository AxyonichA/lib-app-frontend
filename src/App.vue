<script setup>
import { onMounted } from "vue"
import AddPostForm from "./components/AddPostForm.vue"
import PostList from "./components/PostList.vue"
import { usePostsStore } from './stores/PostsStore'

let { getPosts } = usePostsStore()
onMounted(() => {
	getPosts()
})
</script>

<template>
	<AddPostForm></AddPostForm>
	<PostList />
</template>
