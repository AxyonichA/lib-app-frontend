
export default {
	template: `
	<form>
		<label>
			<p>Название поста</p>
			<input type='text' v-model="postTitle" />               
		</label>
		<label>
			<p>Содержимое</p>
			<textarea v-model="postBody" />               
		</label>
		<div>
			<button @click="(e) => {
				e.preventDefault()
				postAdd()
			}">Запостить</button>
			<button @click="(e) => {
				e.preventDefault()
				postTitle = ''
				postBody = ''
			}">
				Отмена
			</button>
		</div>
	</form>
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
			postTitle: "",
			postBody: "",
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
		postAdd() {
			this.posts = [...this.posts, {title: this.postTitle, body: this.postBody}]
			this.postTitle = ''
			this.postBody = ''
		}
	}
}
