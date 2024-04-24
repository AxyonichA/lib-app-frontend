import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { usePostsStore } from './PostsStore'
export const useAuthorsStore = defineStore('authors', () => {
	// let {posts} = storeToRefs(usePostsStore())
	let authors = ref([])
	let authorPosts = ref([])

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
			authorPosts.value = response.data
		} catch (err) {
			console.log(err)
		}
	}

	async function authorPostDelete(id) {
		try {
			await axios.delete(`http://localhost:5000/api/posts/${id}`, { postId: id })
			// posts.value = posts.value.filter(post => post.id !== id)
			// const response = await axios.get(`http://localhost:5000/api/authors/${authorName}`)
			// authorPosts.value = response.data
		} catch (err) {
			console.log(err)
		}
	}
	return { authors, authorPosts, getAuthors, getAuthor, authorPostDelete }
})