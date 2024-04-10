export default {
	template: `
		<ul style="list-style-type: none">
			<li v-for="post in posts" :key="post.id">
				<h2>{{post.title}}</h2>
				<p>{{post.body}}</p>
				<button @click="postDelete(post.id)">Удалить пост</button>
			</li>
		</ul>
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
		}
	}
}