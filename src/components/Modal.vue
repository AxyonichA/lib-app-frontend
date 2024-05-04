<script setup>
const modalShow = defineModel('modalShow')
</script>

<template>
	<slot name="modalButton" />
	<div class="modal" :class="{ 'd-block': modalShow }" id="modal" aria-labelledby="staticBackdropLabel">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<slot name="modalHeader" />
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