<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';

import { getUser, updateUser} from '../requests/usersReq.js'
import { storeToRefs } from 'pinia'
let { user } = storeToRefs(useAuthStore())
let userInfo = ref({...user.value})

let isEdit = ref(false)
</script>

<template>
	<div class="d-flex justify-content-between align-items-center ">
		<div class="d-flex flex-column ">
			<label class="d-block">
				<p class="mt-1">Ваш никнейм:</p>
				<input type="text" v-model.trim="userInfo.nickName" :readonly="!isEdit" :class="isEdit ? 'form-control' : 'form-control-plaintext ps-3'">
			</label>
			<label class="d-block">
				<p class="mt-1">Ваша почта:</p>
				<input type="email" v-model.trim="userInfo.login" :readonly="!isEdit" :class="isEdit ? 'form-control' : 'form-control-plaintext ps-3'">
			</label>
			<RouterLink to="/profile/changePassword" class="">Изменить пароль</RouterLink>
		</div>
		<div>
			<button @click.prevent="isEdit = !isEdit" class="btn btn-primary">
				{{ isEdit ? 'Отмена' : 'Редактировать профиль'}}
			</button>
			<button @click.prevent="async () => {
				await updateUser(userInfo)
				await getUser(user.id)
				isEdit = false
			}" class="btn btn-secondary">Сохранить изменения</button>				
		</div>

	</div>
</template>