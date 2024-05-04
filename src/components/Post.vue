<script setup>
import { useRoute } from 'vue-router'

let route = useRoute()
let {authorId} = route.params

defineProps({
	post: Object,
})

defineEmits([
	'handlePostDelete',
	'handleChangePostClick'
])

</script>

<template>
		<article class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{post.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{post.body}}</p>
			<span v-if="!authorId" class="ms-auto fs-5">{{ post.authorName }}</span>
			<button @click.prevent="() => $emit('handlePostDelete', post, authorId)" class="btn btn-danger">Удалить пост</button>
			<button @click="() => $emit('handleChangePostClick', post)" class="btn btn-secondary mt-1 ">Редактировать</button>
		</article>
</template>