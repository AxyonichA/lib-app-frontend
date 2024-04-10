export default {
	template: `
		<button @click="(e) => {
			e.preventDefault()
			onclick()
		}">
			<slot />
		</button>
	`,
	methods: {

	},
	props: {
		onclick: {
			type: Function
		}
	}
}