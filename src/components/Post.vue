<script setup>
import CommonButton from './CommonButton.vue'
import { usePostsStore } from '../stores/PostsStore';

let { postDelete } = usePostsStore()

defineProps({
	post: Object,
})
</script>

<template>
	<li>
		<h2>{{post.title}}</h2>
		<p>{{post.body}}</p>
		<CommonButton :onclick="() => postDelete(post.id)">Удалить пост</CommonButton>
	</li>
</template>