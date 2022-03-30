import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store/index'

const routes = [
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/login',
		name: '登录页',
		component: () => import('../views/login/index.vue'),
	},
	{
	    path: '/index',
	    name: '主页',
		component: () => import('../views/index.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path !== '/login') {
		if (store.state.user.token) {
			next()
		} else {
			next('/login')
		}
	} else {
		next()
	}
})

export default router