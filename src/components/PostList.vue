<script setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '../stores/PostsStore'
import Post from './Post.vue'

let {posts} = storeToRefs(usePostsStore())
</script>


<template>
	<ul style="list-style-type: none">
		<Post v-for="post in posts" :post="post" :key="post.id" />
	</ul>	
</template>
