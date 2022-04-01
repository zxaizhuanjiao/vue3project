import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store/index'

const routes = [
	{
		path: '/',
		redirect: '/dashboard'
	},
	{
		path: '/login',
		name: '登录页',
		component: () => import('../views/login/index.vue'),
	},
	{
	    path: '/dashboard',
	    name: '首页',
		component: () => import('../views/dashboard/index.vue')
	},
	{
	    path: '/protocol',
	    name: '协议审计',
		component: () => import('../views/security/protocol/index.vue')
	},
	{
	    path: '/flow',
	    name: '流量统计',
		component: () => import('../views/security/flow/index.vue')
	},
	{
	    path: '/logInfo',
	    name: '事件信息',
		component: () => import('../views/logInfo/index.vue')
	},
	{
	    path: '/whiteList',
	    name: '白名单',
		component: () => import('../views/ruleMangement/whiteList/index.vue')
	},
	{
	    path: '/blackList',
	    name: '黑名单',
		component: () => import('../views/ruleMangement/blackList/index.vue')
	},
	{
	    path: '/ipMacList',
	    name: 'IP/MAC',
		component: () => import('../views/ruleMangement/ipMacList/index.vue')
	},
	{
	    path: '/authority',
	    name: '角色管理',
		component: () => import('../views/superAdmin/authority/authority.vue')
	},
	{
	    path: '/menu',
	    name: '菜单管理',
		component: () => import('../views/superAdmin/menu/menu.vue')
	},
	{
	    path: '/interface',
	    name: 'api管理',
		component: () => import('../views/superAdmin/api/api.vue')
	},
	{
	    path: '/user',
	    name: '用户管理',
		component: () => import('../views/superAdmin/user/user.vue')
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