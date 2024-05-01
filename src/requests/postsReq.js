import axios from 'axios'

async function postDelete(id) {
	try {
		await axios.delete(`http://localhost:5000/api/posts/${id}`, { postId: id })
	} catch (err) {
		console.log(err)
	}
}

async function postAdd(editedPost, posts) {
	try {
		await axios.post('http://localhost:5000/api/posts', {id: posts.length === 0 ? 1 : posts[posts.length - 1].id + 1, ...editedPost})
	} catch (err) {
		console.log(err)
	}
}

async function postUpdate(editedPost) {
	try {
		await axios.put(`http://localhost:5000/api/posts/${editedPost.id}`, {...editedPost})
	} catch (err) {
		console.log(err)
	}
}

let getPosts = async() => {
	try {
		let response = await axios.get("http://localhost:5000/api/posts")
		console.log('done')
		return response.data			
	} catch(err) {
		console.log(err)
	}
}

export {getPosts, postAdd, postUpdate, postDelete}