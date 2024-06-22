<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import Input from './Input.vue';
import { getAuthor, updateAuthor } from '../requests/authorReq'
let route = useRoute()

let {authorId} = route.params
let author = ref(route.query)

let editedAuthor = ref({...author.value})
let isEdit = ref(false)
function editToggle() {
	isEdit.value = !isEdit.value
	editedAuthor.value = {...author.value}
}

const removeMatchingKeys = (obj1, obj2) => {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key] && key !== '_id') {
      delete obj1[key];
    }
  }
}

async function handleAuthorUpdate() {
	try {
		removeMatchingKeys(editedAuthor.value, author.value)
		const result = await updateAuthor(editedAuthor.value)
		author.value = await getAuthor(author.value._id)
		isEdit.value = false
	} catch (err) {
		console.log(err);
	}
}
</script>

<template>
	<div class="d-flex justify-content-between align-items-center ">
		<div class="d-flex flex-column ">
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.fullname"/>
			<h1 v-else class="">{{ author.fullname }}</h1>
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.birthDate"/>
			<p v-else class="">{{ author.birthDate}}</p>
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.birthPlace"/>
			<p v-else class="">{{ author.birthPlace}}</p>
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.deathDate"/>
			<p v-else class="">{{ author.deathDate}}</p>
			<Input v-if="isEdit" type="text" :isRead="!isEdit" :class="{ 'form-control': isEdit, 'form-control-plaintext ms-2': !isEdit}" v-model:model="editedAuthor.deathPlace"/>
			<p v-else class="">{{ author.deathPlace}}</p>
		</div>
		<div>
			<button @click.prevent="editToggle" class="btn btn-primary">
				{{ isEdit ? 'Отмена' : 'Редактировать'}}
			</button>
			<button v-if="isEdit" @click.prevent="handleAuthorUpdate" class="btn btn-secondary">Сохранить изменения</button>				
		</div>
	</div>
</template>