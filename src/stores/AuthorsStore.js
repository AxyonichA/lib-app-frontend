import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { usePostsStore } from './PostsStore'
export const useAuthorsStore = defineStore('authors', () => {
	let {posts} = storeToRefs(usePostsStore())
	let authors = ref([])
	let authorName = ref('')
	async function getAuthors() {
		try {
			const response = await axios("http://localhost:5000/api/authors")
			authors.value = response.data
		} catch (err) {
			console.log(err)
		}
	}

	async function getAuthorPosts(id) {
		try {
			const response = await axios(`http://localhost:5000/api/authors/${id}/posts`)
			posts.value = response.data.authorPosts
			authorName.value = response.data.name
		} catch (err) {
			console.log(err)
		}
	}
	return { authors, authorName, getAuthors, getAuthorPosts }
})