<script setup>
import { onBeforeMount, ref } from "vue"
import { RouterLink } from 'vue-router'

import { getAuthors } from '../requests/authorReq';

let authors = ref([])

onBeforeMount(async() => {
	authors.value = await getAuthors()
})
</script>

<template>
	<section v-for="author in authors" class="row my-4 border mx-0 border-primary border-2 rounded">
				<RouterLink :to="`/authors/${author.id}/posts`" :key="author.id">{{author.name}}</RouterLink>
	</section>	
</template>