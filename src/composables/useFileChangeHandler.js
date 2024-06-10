import { ref } from 'vue'

// создаёт реф, содержащий поле file с экземпляром файла и поле options с опциями
// содержит обработчик для поля ввода file
// создаёт значения опций entity_type и entity_propertyName
// ! entity_id необходимо изменять вне экземпляра, после создания родительской сущности!!!
export default function useFileChangeHandler(type, propertyName) {
	const selectedFile = ref({
		file: {},
		options: {}
	})
	function handleFileChange(e) {
		selectedFile.value.file = e.target.files[0]
	}

	selectedFile.value.options.entity_type = type
	selectedFile.value.options.entity_propertyName = propertyName

	return { selectedFile, handleFileChange }
}
