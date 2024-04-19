import { ref } from "vue" 
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostsStore = defineStore('posts', () => {

	let posts = ref([])
	let postTitle = ref('')
	let postBody = ref('')

	async function postDelete(id) {
		try {
			const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, { postId: id })
			posts.value = posts.value.filter(post => post.id !== id)
		} catch (err) {
			console.log(err)
		}
	}

	async function postAdd() {
		if(postTitle.value === "" || postBody.value ==="") {
			return
		}
		try {
			let response = await axios.post('http://localhost:5000/api/posts', {id: posts.value.length === 0 ? 1 : posts.value[posts.value.length - 1].id + 1, title: postTitle.value, body: postBody.value})
			posts.value = response.data
		} catch (err) {
			console.log(err)
		}
		clearPostAddForm()
	}

	async function postUpdate(id) {
		if(postTitle.value === "" || postBody.value ==="") {
			return
		}
		try {
			let response = await axios.put(`http://localhost:5000/api/posts/${id}`, {title: postTitle.value, body: postBody.value})
			posts.value = response.data
		} catch (err) {
			console.log(err)
		}
		clearPostAddForm()
	}

	function clearPostAddForm() {
		postTitle.value = "";
		postBody.value = "";
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
	
	return { posts, postTitle, postBody, postDelete, postUpdate, postAdd, getPosts, clearPostAddForm }
})