
import AddPostForm from './components/AddPostForm.js'
import CommonButton from './components/CommonButton.js'
import Post from './components/Post.js'
import PostList from './components/PostList.js'

export default {
	components: {
		CommonButton,
		Post,
		AddPostForm,
		PostList
	},
	template: `
		<AddPostForm @postAdd="postAdd"></AddPostForm>
		<PostList :posts="posts" :postDelete="postDelete" />
	`,
	data() {
		return {
			posts: []     
		}
	},
	mounted() {
		this.getPosts()
	},
	methods: {
		getPosts() {
			fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
				.then(response => response.json())
				.then(data => this.posts = data)
		},
		postDelete(id) {
			this.posts = this.posts.filter(p => p.id !== id)
		},
		postAdd(postTitle, postBody) {
			this.posts.push({title: postTitle, body: postBody, id: this.posts.length + 1})
		},
	}
}
