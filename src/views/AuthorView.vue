<script setup>
import { useRoute } from 'vue-router';

import BookList from "../components/BookList.vue"

let route = useRoute()
let {authorId} = route.params

</script>

<template>
	<BookList :authorID="authorId" />
</template>