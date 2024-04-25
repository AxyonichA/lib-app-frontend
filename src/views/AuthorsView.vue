<script setup>
import { onBeforeMount } from "vue"
import { useAuthorsStore } from '../stores/AuthorsStore';
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

let { getAuthors } = useAuthorsStore()
let { authors } = storeToRefs(useAuthorsStore())


onBeforeMount(() => {
	getAuthors()
})
</script>
<template>
	<section v-for="author in authors" class="row my-4 border mx-0 border-primary border-2 rounded">
				<RouterLink :to="`/authors/${author.id}/posts`" :key="author.id">{{author.name}}</RouterLink>
	</section>	

</template>