<script setup>
	defineProps({
		onclick: Function
	})
</script>

<template>
	<button @click.prevent="(e) => {
		onclick()
	}">
		<slot />
	</button>
</template>

