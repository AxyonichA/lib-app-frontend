import CommonButton from './CommonButton'

export default {
	components: {
		CommonButton
	},
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
				<CommonButton :onclick="postAdd">
					Запостить
				</CommonButton>
				<CommonButton :onclick="clearPostAddForm">
					Отмена
				</CommonButton>
			</div>
		</form>
	`,
	data() {
		return {
			postTitle: '',
			postBody: ''
		}
	},
	methods: {
		postAdd() {
			this.$emit("postAdd", this.postTitle, this.postBody)
			this.clearPostAddForm()
		},
		clearPostAddForm() {
			this.postTitle = ''
			this.postBody = ''
		}
	}
}