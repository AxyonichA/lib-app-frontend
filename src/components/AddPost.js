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
		</form>
	`,
	data() {
		return {
			postTitle: "",
			postBody: ""     
		}
	},
}