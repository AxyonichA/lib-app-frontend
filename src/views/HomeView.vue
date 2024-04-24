<script setup>
import { onBeforeMount } from "vue"
import AddPostForm from "../components/AddPostForm.vue"
import { usePostsStore } from '../stores/PostsStore'
import { storeToRefs } from 'pinia';

let { getPosts, postDelete } = usePostsStore()
let {posts} = storeToRefs(usePostsStore())

onBeforeMount(() => {
	getPosts()
})
</script>

<template>
	<AddPostForm></AddPostForm>
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<article v-for="post in posts" :post="post" :key="post.id" class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>
			<button @click.prevent="() => postDelete(post.id)" class="btn btn-secondary">Удалить пост</button>
		</article>
	</section>	
	
</template>
