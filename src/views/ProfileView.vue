<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';

import { getUser, updateUser} from '../requests/usersReq.js'
import { storeToRefs } from 'pinia'
import useVuelidate from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators'
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

const rules = computed(() => {
	return {
		login: { 
			required: helpers.withMessage("Поле обязательно для заполнения", required), 
			email: helpers.withMessage("Укажите корректный почтовый адрес", email)
		},
		nickName: { 
			required: helpers.withMessage("Поле обязательно для заполнения", required), 
			minLength: helpers.withMessage("Длина выбираемого никнейма должна быть не менее 5 символов", minLength(5)), 
			maxLength: helpers.withMessage("Длина выбираемого никнейма должна быть не более 20 символов", maxLength(20))
		}
	}
})

let v$ = useVuelidate(rules, userInfo)
</script>

<template>
	<div class="d-flex justify-content-between align-items-center ">
		<div class="d-flex flex-column ">
			<label class="d-block">
				<p class="mt-1">Ваш никнейм:</p>
				<input type="text" v-model.trim="userInfo.nickName" @blur="v$.nickName.$touch" :readonly="!isEdit" :class="isEdit ? 'form-control' : 'form-control-plaintext ps-3'">
				<div v-if="v$.nickName.$error" class="d-flex flex-column">
					<span v-for="error in v$.nickName.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
				</div> 
			</label>
			<label class="d-block">
				<p class="mt-1">Ваша почта:</p>
				<input type="email" v-model.trim="userInfo.login" @blur="v$.nickName.$touch" :readonly="!isEdit" :class="isEdit ? 'form-control' : 'form-control-plaintext ps-3'">
				<div v-if="v$.login.$error" class="d-flex flex-column">
					<span v-for="error in v$.login.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
				</div> 
			</label>
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