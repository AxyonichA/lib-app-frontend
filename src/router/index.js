import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorsView from '../views/AuthorsView.vue'
import AuthorView from '../views/AuthorView.vue'
import AuthorizationView from '../views/AuthorizationView.vue'


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

export default router
