import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { usePostsStore } from './PostsStore'
export const useAuthorsStore = defineStore('authors', () => {
	let {posts} = storeToRefs(usePostsStore())
	let authors = ref([])

	async function getAuthors() {
		try {
			const response = await axios("http://localhost:5000/api/authors")
			authors.value = response.data
		} catch (err) {
			console.log(err)
		}
	}

	async function getAuthor(authorName) {
		try {
			const response = await axios(`http://localhost:5000/api/authors/${authorName}`)
			posts.value = response.data
		} catch (err) {
			console.log(err)
		}
	}
	return { authors, getAuthors, getAuthor }
})