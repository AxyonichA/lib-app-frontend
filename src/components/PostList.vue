<script setup>
import Post from './Post.vue'
import { defineModel } from 'vue';

const editedPost = defineModel('editedPost')
const posts = defineModel('posts')
</script>


<template>
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<Post v-for="post in posts" :post="post" :key="post.id" v-model:editedPost="editedPost" v-model:posts="posts"/>
	</section>
</template>
