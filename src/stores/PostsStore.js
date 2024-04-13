import { ref } from "vue" 
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', () => {

	let posts = ref([])
	let postTitle = ref('')
	let postBody = ref('')


	function postDelete(id) {
			posts.value = posts.value.filter((p) => p.id !== id)
	}
	function postAdd() {
		if(postTitle.value.trim() === "" || postBody.value.trim() ==="") {
			return
		}
		posts.value.push({ title: postTitle.value, body: postBody.value, id: posts.value.length + 1 })
		clearPostAddForm()
	}
	function clearPostAddForm() {
		postTitle.value = "";
		postBody.value = "";
		}


	function getPosts() {
		fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
			.then((response) => response.json())
			.then((data) => posts.value = data)
	}
	
	return { posts, postTitle, postBody, postDelete, postAdd, getPosts, clearPostAddForm }
})