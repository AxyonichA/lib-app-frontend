import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorsView from '../views/AuthorsView.vue'
import AuthorView from '../views/AuthorView.vue'
import AuthorizationView from '../views/AuthorizationView.vue'

import { extractInfoFromCookies } from '../services/cookies'
import { getUser } from '../requests/usersReq'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/useAuthStore';

const routes = [ 
	{ path: '/', name: 'home', component: HomeView},
	{ path: '/authors', name: 'authors', component: AuthorsView},
	{ path: '/authors/:authorId/books', name:'authorBooks', component: AuthorView},
	{ path: '/authorization', name:'authorization', component: AuthorizationView}
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
	if(!user.value) {
		let extractedUserID = extractInfoFromCookies('userID')
		await getUser(extractedUserID)
	}
})

export default router
