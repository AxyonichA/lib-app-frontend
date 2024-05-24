<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { changeUserPassword } from '../requests/usersReq.js'
import useVuelidate from '@vuelidate/core'
import { helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { clearAllCookies } from '../services/cookies.js'

let router = useRouter()
let { user } = useAuthStore()

const passwordFields = ref({})
async function handlePasswordChange() {
	let validationResult = await v$.value.$validate()
	if(validationResult) {
		await changeUserPassword(user.id, passwordFields.value.oldPassword, passwordFields.value.newPassword)
		passwordFields.value = {}
		clearAllCookies()
		router.push({path: '/authorization'})
	} else {
		return
	}
}

const rules = computed(() => {
	return {
		oldPassword: {
			required
		},
		newPassword: {
			required: helpers.withMessage("Поле обязательно для заполнения", required),
			minLength: helpers.withMessage("Длина вашего пароля должна быть не менее 5 символов", minLength(5)), 
			maxLength: helpers.withMessage("Длина вашего пароля должна быть не более 20 символов", maxLength(20)),
			regEx: helpers.withMessage("Пароль должен содержать хотя бы одну цифру, один строчный и один заглавный символ, специальный знак, и не содержать пробелов", helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/))
		},
		passwordConfirm: {
			required: helpers.withMessage("Поле обязательно для заполнения", required),
			sameAs: helpers.withMessage("Пароли должны совпадать", sameAs(passwordFields.value.newPassword))
		}
	}
})

const v$ = useVuelidate(rules, passwordFields)
</script>

<template>
	<form class="p-2 border border-2 border-primary rounded">
		<label class="d-block">
			<p>Старый пароль:</p>
			<input type="text" v-model.trim="passwordFields.oldPassword" @blur="v$.oldPassword.$touch" class="form-control">
			<div v-if="v$.oldPassword.$error" class="d-flex flex-column">
				<span v-for="error in v$.oldPassword.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
			</div> 
		</label>
		<label class="d-block">
			<p>Новый пароль:</p>
			<input type="text" v-model.trim="passwordFields.newPassword" @blur="v$.newPassword.$touch" class="form-control">
			<div v-if="v$.newPassword.$error" class="d-flex flex-column">
				<span v-for="error in v$.newPassword.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
			</div> 
		</label>
		<label class="d-block">
			<p>Повторите новый пароль:</p>
			<input type="text" v-model.trim="passwordFields.passwordConfirm" class="form-control">
			<div v-if="v$.passwordConfirm.$error" class="d-flex flex-column">
				<span v-for="error in v$.passwordConfirm.$errors" :key="error.$uid" class="text-danger">{{ error.$message }}</span>
			</div> 
		</label>
		<div class="mt-3">
			<button @click.prevent="async() => {
				await handlePasswordChange()
			}" class="btn btn-primary">
				Обновить пароль
			</button>				
		</div>
	</form>
</template>