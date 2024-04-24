<script setup>
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthorsStore } from '../stores/AuthorsStore'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
let { getAuthor, authorPostDelete } = useAuthorsStore()
let {authorPosts} = storeToRefs(useAuthorsStore())

let route = useRoute()
let {name} = route.params

onBeforeMount(() => {
	getAuthor(name)
})
</script>

<template>
	<h1>{{$route.params.name}}</h1>
	<!-- <section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<article v-if="authorPosts.length !== 0" v-for="post in authorPosts" :key="post.id" class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>
			<button @click.prevent="async () => {
				await authorPostDelete(post.id)
				await getAuthor(name)
			}" class="btn btn-secondary">Удалить пост</button>
		</article>
	</section>	
	<p v-if="authorPosts.length === 0">У данного автора ещё нет публикаций</p> -->
	<PostList></PostList>
</template>