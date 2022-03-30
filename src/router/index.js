import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const routes = [
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: '登录页',
		component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue'),
	},
	{
	    path: '/index',
	    name: '主页',
	    // component: Home,
	    // icon: 'home',
	    // meta: { hidden: false, title: '主页' },
	    // children: [
		// 	{
		// 		path: '/index',
		// 		name: 'Index',
		// 		meta: { title: '总览' },
				component: () => import(/* webpackChunkName: "product" */ '../views/index.vue')
		// 	}
	    // ]
	},
	// {
	//     path: '/user/list',
	//     name: '用户管理',
	//     component: Home,
	//     icon: '#icon-yonghuguanli2',
	//     meta: {hidden: false, title: '用户管理' },
	//     children: [
	// 		{
	// 			path: '/sale/list',
	// 			name: 'saleList',
	// 			meta: { title: '销售管理'},
	// 			icon: '#icon-xiaoshouyuan',
	// 			component: () => import(/* webpackChunkName: "users" */ '../views/user/SaleManage')
	// 		},
	// 		{
	// 			path: '/customer/list',
	// 			name: 'customerList',
	// 			meta: { title: '客户管理'},
	// 			icon: '#icon-kehu1',
	// 			component: () => import(/* webpackChunkName: "users" */ '../views/user/CustomerManage')
	// 		},
	//     ]
	// },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router