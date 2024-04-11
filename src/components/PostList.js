import Post from './Post'

export default {
	components: {
		Post
	},
	template: `
		<ul style="list-style-type: none">
			<Post v-for="post in posts" :post="post" :key="post.id" :postDelete="postDelete"/>
		</ul>
	`,
	props: {
		posts: Array,
		postDelete: Function
	}
}