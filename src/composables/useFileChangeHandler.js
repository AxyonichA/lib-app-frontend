import { ref } from 'vue'
import { deleteFileByID } from '../requests/fileReq'

// создаёт реф, содержащий поле file с экземпляром файла и поле options с опциями
// содержит обработчик для поля ввода file
// создаёт значения опций entity_type и entity_propertyName
// ! entity_id необходимо изменять вне экземпляра, после создания родительской сущности!!!

export default function useFileChangeHandler(type, propertyName) {
	const selectedFiles = ref({
		files: {},
		options: {}
	})

	selectedFiles.value.options.entity_type = type
	selectedFiles.value.options.entity_propertyName = propertyName

	function handleFileChange(e) {
		console.log(e);
		selectedFiles.value.files = e.target.files
	}


	const editedFiles = ref(new Set())	
	async function handleFilesDelete(entityID) {
		editedFiles.value.forEach(async(fileID) => {
			await deleteFileByID(entityID, fileID)
		})
		editedFiles.value = new Set()
	}

	return { selectedFiles, editedFiles, handleFileChange, handleFilesDelete }
}
