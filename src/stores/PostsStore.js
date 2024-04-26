import { ref } from "vue" 
import { defineStore } from 'pinia'

import axios from 'axios'

export const usePostsStore = defineStore('posts', () => {
	let posts = ref([])
	let postTitle = ref('')
	let postBody = ref('')
	let postAuthor = ref('')
	let editedPost = ref({})
	async function postDelete(id) {
		try {
			await axios.delete(`http://localhost:5000/api/posts/${id}`, { postId: id })
		} catch (err) {
			console.log(err)
		}
	}

	async function postAdd() {
		if(!editedPost.value.title || !editedPost.value.body || !editedPost.value.author) {
			return
		}
		try {
			await axios.post('http://localhost:5000/api/posts', {id: posts.value.length === 0 ? 1 : posts.value[posts.value.length - 1].id + 1, ...editedPost.value})
		} catch (err) {
			console.log(err)
		}
		clearPostAddForm()
	}

	async function postUpdate(id) {
		if(!editedPost.value.title || !editedPost.value.body || !editedPost.value.author) {
			return
		}
		try {
			await axios.put(`http://localhost:5000/api/posts/${id}`, {...editedPost.value})
		} catch (err) {
			console.log(err)
		}
		clearPostAddForm()
	}

	function clearPostAddForm() {
		editedPost.value = {}
	}

	async function getPosts() {
		try {
			let response = await axios.get("http://localhost:5000/api/posts")
			posts.value = response.data
			console.log('done')
		} catch(err) {
			console.log(err)
		}
	}
	
	return { posts, postTitle, postBody, postAuthor, editedPost, postDelete, postUpdate, postAdd, getPosts, clearPostAddForm }
})