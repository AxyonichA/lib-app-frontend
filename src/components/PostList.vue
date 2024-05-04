<script setup>
import { defineModel } from 'vue';

import Post from './Post.vue'

import { getPosts, postDelete } from '../requests/postsReq';
import { getAuthorPosts } from '../requests/authorReq';

const editedPost = defineModel('editedPost')
const posts = defineModel('posts')

const modalTitle = defineModel('modalTitle')
const modalShow = defineModel('modalShow')


async function handlePostDelete(post, authorId) {
	await postDelete(post.id);
	posts.value = authorId ? (await getAuthorPosts(authorId))[0] : await getPosts()
}

function handleChangePostClick(post) {
	editedPost.value = {...post}
	modalTitle.value = 'Редактировать пост'
	modalShow.value = true
}
</script>


<template>
	<section class="row row-cols-2 my-4 border mx-0 border-primary border-2 rounded">
		<Post v-for="post in posts" :post="post" @handleChangePostClick="handleChangePostClick" @handlePostDelete="handlePostDelete" :key="post.id" />
	</section>
</template>
