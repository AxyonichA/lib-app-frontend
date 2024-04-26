import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorsView from '../views/AuthorsView.vue'
import AuthorView from '../views/AuthorView.vue'


const routes = [ 
	{ path: '/', name: 'home', component: HomeView},
	{ path: '/authors', name: 'authors', component: AuthorsView},
	// { path: '/authors/:id/posts', component: AuthorView},
	{ path: '/authors/:authorId/posts', component: AuthorView},

]
const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
