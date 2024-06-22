import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import HomeView from '../views/HomeView.vue'
import AuthorsView from '../views/AuthorsView.vue'
import AuthorView from '../views/AuthorView.vue'
import AuthorizationView from '../views/AuthorizationView.vue'

import { extractInfoFromCookies } from '../services/cookies'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/useAuthStore';
import AdminView from '../views/AdminView.vue'
import ProfileView from '../views/ProfileView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import BookList from '../components/BookList.vue'
import BookView from '../views/BookView.vue'


const routes = [ 
	{ path: '/', name: 'home', component: HomeView},
	{ path: '/books/:bookID', component: BookView},
	{ path: '/authors', name: 'authors', component: AuthorsView},
	{ path: '/authors/:authorId', component: AuthorView,
		children: [
			{
			path:'books',
			component: BookList
			}
		]
	},
	{ path: '/authorization', name:'authorization', component: AuthorizationView},
	{ path: '/admin', name:'admin', component: AdminView},
	{ path: '/profile', name:'profile', component: ProfileView},
	{ path: '/profile/changePassword', name:'passwordchange', component: ChangePasswordView}
]
const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(async(to, from) => {
	const { user } = storeToRefs(useAuthStore())
	let extractedToken = extractInfoFromCookies('token')
	if(!extractedToken && to.path !== '/authorization') {
		return ({path: '/authorization'})
	}
	if(!user.value && to.path !== '/authorization') {
		const response = await axios.get('/authorization')
		user.value = response.data
	}
})

export default router
