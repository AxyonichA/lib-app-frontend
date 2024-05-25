<script setup>
import { readonly } from 'vue'


defineProps({
	type: String,
	label: String,
	isRead: Boolean,
	disabled: Boolean,
	inputID: String,
	error: Boolean,
	errors: Array
})
let model = defineModel('model')
defineEmits([
	'touch'
])

</script>

<template>
	<label :for="inputID" class="m-1 mb-2">{{ label }}:</label>
	<input :type="type" :id="inputID" :readonly="isRead" :disabled="disabled" v-model.trim="model" @blur="() => $emit('touch', inputID)" :class="$attrs.class">
	<div v-if="error" class="d-flex flex-column">
		<span v-for="error in errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
	</div> 
</template>