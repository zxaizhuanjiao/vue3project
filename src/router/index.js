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
		component: () => import('../view/login/index.vue'),
	},
	{
	    path: '/dashboard',
	    name: '首页',
		component: () => import('../view/dashboard/index.vue')
	},
	{
	    path: '/protocol',
	    name: '协议审计',
		component: () => import('../view/security/protocol/index.vue')
	},
	{
	    path: '/flow',
	    name: '流量统计',
		component: () => import('../view/security/flow/index.vue')
	},
	{
	    path: '/logInfo',
	    name: '事件信息',
		component: () => import('../view/logInfo/index.vue')
	},
	{
	    path: '/whiteList',
	    name: '白名单',
		component: () => import('../view/ruleMangement/whiteList/index.vue')
	},
	{
	    path: '/blackList',
	    name: '黑名单',
		component: () => import('../view/ruleMangement/blackList/index.vue')
	},
	{
	    path: '/ipMacList',
	    name: 'IP/MAC',
		component: () => import('../view/ruleMangement/ipMacList/index.vue')
	},
	{
	    path: '/authority',
	    name: '角色管理',
		component: () => import('../view/superAdmin/authority/authority.vue')
	},
	{
	    path: '/menu',
	    name: '菜单管理',
		component: () => import('../view/superAdmin/menu/menu.vue')
	},
	{
	    path: '/interface',
	    name: 'api管理',
		component: () => import('../view/superAdmin/api/api.vue')
	},
	{
	    path: '/user',
	    name: '用户管理',
		component: () => import('../view/superAdmin/user/user.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

let asyncRouterFlag = 0
router.beforeEach((to, from, next) => {
	const token = store.state.user.token
	// console.log(asyncRouterFlag)
	if (to.path !== '/login') {
		// console.log('非login')
		if (token) {
			// if (!asyncRouterFlag) {
			// 	asyncRouterFlag++
			// 	next()
			// } else {
			// 	next()
			// }
			next()
		} else {
			next('/login')
		}
	} else{
		// console.log('login')
		// if (token) {
		// 	if (!asyncRouterFlag) {
		// 		asyncRouterFlag++
		// 		next({ path: '/dashboard' })
		// 	  } else {
		// 		next()
		// 	  }
		// 	// next({ path: '/dashboard' })
		// }

		// if (!token) {
		// 	next()
		// }
		next()
	}
})

export default router