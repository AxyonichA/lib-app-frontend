<script setup>


</script>

<template>
	<div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">Новый пост</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">Закрыть</button>
				</div>
				<div class="modal-body">
					<slot name="form"/>
				</div>
				<div class="modal-footer d-flex justify-content-between mt-3">
					<slot name="postEdit" />
				</div>
			</div>
		</div>
	</div>
</template>