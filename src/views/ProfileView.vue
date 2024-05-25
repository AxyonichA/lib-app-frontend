<script setup>
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators'

import Input from '../components/Input.vue';
import { getUser, updateUser} from '../requests/usersReq.js'

import { useAuthStore } from '../stores/useAuthStore';
import { storeToRefs } from 'pinia'
import { getRules } from '../services/vuelidate.js'


let { user } = storeToRefs(useAuthStore())
let userInfo = ref({...user.value})

let isEdit = ref(false)


async function handleUpdateUser() {
	let validationResult = v$.value.$validate()
	if(validationResult) {
		await updateUser(userInfo.value)
		await getUser(user.value.id)
		isEdit.value = false		
	}

}

let v$ = useVuelidate(getRules(userInfo.value), userInfo)

function handleInputTouch(model) {
	v$.value[model].$touch()
}

</script>

<template>
	<div class="d-flex justify-content-between align-items-center ">
		<div class="d-flex flex-column ">
			<Input type="email" label="Почта" inputID="login" :isRead="!isEdit" :class="{ 'form-control': isEdit, 'form-control-plaintext': !isEdit}" :error="v$.login.$error" :errors="v$.login.$errors" @touch="handleInputTouch" v-model:model="userInfo.login"/>
			<Input type="text" label="Никнейм" inputID="nickName" :isRead="!isEdit" :class="{ 'form-control': isEdit, 'form-control-plaintext': !isEdit}"  :error="v$.nickName.$error" :errors="v$.nickName.$errors" @touch="handleInputTouch" v-model:model="userInfo.nickName"/>
			<RouterLink to="/profile/changePassword" class="">Изменить пароль</RouterLink>
		</div>
		<div>
			<button @click.prevent="isEdit = !isEdit" class="btn btn-primary">
				{{ isEdit ? 'Отмена' : 'Редактировать профиль'}}
			</button>
			<button @click.prevent="async () => {
				await handleUpdateUser()
			}" class="btn btn-secondary">Сохранить изменения</button>				
		</div>

	</div>
</template>