<script setup>
import { useRoute } from 'vue-router'

let route = useRoute()
let {authorId} = route.params

defineProps({
	book: Object,
})

defineEmits([
	'handleBookDelete',
	'handleChangeBookClick'
])

</script>

<template>
		<article class="col d-flex flex-column p-3 text-center border border-primary" style="height: 450px">
			<h2 class="my-auto">{{book.title}}</h2>
			<p class="h-50 overflow-hidden align-content-center ">{{book.body}}</p>
			<span v-if="!authorId" class="ms-auto fs-5">{{ book.authorName }}</span>
			<button @click.prevent="() => $emit('handleBookDelete', book, authorId)" class="btn btn-danger">Удалить книгу</button>
			<button @click.prevent="() => $emit('handleChangeBookClick', book)" class="btn btn-secondary mt-1">Редактировать</button>
		</article>
</template>