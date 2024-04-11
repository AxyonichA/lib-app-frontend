import CommonButton from './CommonButton'

export default {
	components: {
		CommonButton,
	},
	template: `
		<li>
			<h2>{{post.title}}</h2>
			<p>{{post.body}}</p>
			<CommonButton :onclick="() => postDelete(post.id)">Удалить пост</CommonButton>
		</li>
	`,
	props: {
		post: Object,
		postDelete: Function
	}
}