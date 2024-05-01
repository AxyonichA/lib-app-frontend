<script setup>

defineProps({
	title: String
})
const modalShow = defineModel('modalShow')
</script>

<template>
	<div class="modal" :class="{ 'd-block': modalShow }" id="modal" aria-labelledby="staticBackdropLabel">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
					<button type="button" class="btn-close" @click="modalShow = false">Закрыть</button>
				</div>
				<div class="modal-body">
					<slot name="modalBody"/>
				</div>
				<div class="modal-footer justify-content-between mt-3">
					<slot name="modalFooter" />
				</div>
			</div>
		</div>
	</div>
</template>