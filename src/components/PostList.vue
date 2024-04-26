<script setup>
import { storeToRefs } from 'pinia';

import Post from './Post.vue'

import { usePostsStore } from '../stores/PostsStore'

let {posts} = storeToRefs(usePostsStore())

</script>


<template>
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<Post v-for="post in posts" :post="post" :key="post.id" />
		<slot />
	</section>
</template>
