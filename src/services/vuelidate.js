import {computed} from 'vue'

import { email, helpers, maxLength, minLength, or, required, sameAs } from '@vuelidate/validators'
export function getRules(model) {
	return computed(() => {
		return {
			login: { 
				required: model.login === "" ? helpers.withMessage("Поле обязательно для заполнения", required) : false, 
				email: helpers.withMessage("Укажите корректный почтовый адрес", email)
			},
			nickName: { 
				required: model.nickName === "" ? helpers.withMessage("Поле обязательно для заполнения", required) : false, 
				minLength: helpers.withMessage("Длина выбираемого никнейма должна быть не менее 5 символов", minLength(5)), 
				maxLength: helpers.withMessage("Длина выбираемого никнейма должна быть не более 20 символов", maxLength(20))
			},
			role: {
				required: model.role === "" ? helpers.withMessage("Поле обязательно для заполнения", required) : false,
				sameAs: model.role === "" ? helpers.withMessage("Роль должна существовать", or(sameAs("admin"), sameAs("user"))) : false
			},
			oldPassword: {
				required: model.oldPassword === "" ? helpers.withMessage("Поле обязательно для заполнения", required) : false
			},
			newPassword: { 
				required: model.newPassword === "" ? helpers.withMessage("Поле обязательно для заполнения", required) : false,
				minLength: helpers.withMessage("Длина вашего пароля должна быть не менее 5 символов", minLength(5)), 
				maxLength: helpers.withMessage("Длина вашего пароля должна быть не более 20 символов", maxLength(20)),
				regEx: helpers.withMessage(
					"Пароль должен содержать хотя бы одну цифру, один строчный и один заглавный символ, специальный знак, и не содержать пробелов",
					helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/)
				)
			},
			passwordConfirm: { 
				required: model.passwordConfirm  === "" ? helpers.withMessage("Поле обязательно для заполнения", required) : false,
				sameAs: helpers.withMessage("Пароли должны совпадать", sameAs(model.newPassword))
			}
		}
	})
}
