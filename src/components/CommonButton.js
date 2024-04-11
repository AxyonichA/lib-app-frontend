export default {
	template: `
		<button @click.prevent="(e) => {
			onclick()
		}">
			<slot />
		</button>
	`,
	props: {
		onclick: {
			type: Function
		}
	}
}