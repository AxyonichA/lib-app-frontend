import AddPost from './components/AddPost.js'
import PostsList from './components/PostsList.js'
export default {
	components: {
		'AddPost': AddPost,
		'PostsList': PostsList
	},
	template: `
		<AddPost />
		<PostsList />
	`
}
