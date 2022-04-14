<template>
	<div>
		<el-container>
			<el-aside :width="isCollapse ? '64px' : '200px'" v-if="token">
				<div style="display: flex;align-items: center;justify-content: center;height: 62px;background-color: #2f3447;color: #ffffff;">
					<h3>
						<svg-icon icon-class="user"></svg-icon>
					</h3>
					<h3 v-if="!isCollapse" style="margin-top: 14px">&ensp;后台管理</h3>
				</div>
				<el-menu class="el-menu-vertical-demo"
						 :collapse="isCollapse"
						 :collapse-transition="false"
						 :unique-opened="true"
						 :default-active="route.path"
						 :style="{ height: (screenHeight-64) + 'px' }"
						 @select="selectMenuItem">
					<!-- 一级菜单 -->
					<template v-for="item in menuList">
						<el-sub-menu :index="'/' + item.path" v-if="item.children && item.children.length > 0" :key="item.ID">
							<!-- 一级菜单模板区域 -->
							<template #title>
								<el-icon><location /></el-icon>
								<span>{{ item.meta.title }}</span>
							</template>
							<!-- 二级菜单 -->
							<el-menu-item v-for="subItem in item.children" :index="'/' + subItem.path" :key="subItem.ID">
								<template #title>
									<el-icon><location /></el-icon>
									<span>{{ subItem.meta.title }}</span>
								</template>
							</el-menu-item>
						</el-sub-menu>
						<template v-else>
							<!-- 一级菜单模板区域 -->
							<el-menu-item :key="item.ID" :index="'/' + item.path">
								<template #title>
									<el-icon><location /></el-icon>
									<span>{{ item.meta.title }}</span>
								</template>
                            </el-menu-item>
						</template>		
					</template>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header v-if="token">
					<el-row>
						<el-col>
							<el-header class="header-cont">
								<el-row class="pd-0">
									<el-col :xs="2" :lg="1" :md="1" :sm="1" :xl="1" style="z-index:100">
										<div class="menu-total" @click="toggleCollapse">
											<el-icon v-if="isCollapse" size="24">
												<expand />
											</el-icon>
											<el-icon v-else size="24">
												<fold />
											</el-icon>
										</div>
									</el-col>
									<el-col :xs="10" :lg="14" :md="14" :sm="9" :xl="14" :pull="1">
										<div class="breadcrumb">
											<a href="/dashboard">主应用</a>
											<!-- <a href="/vue">子应用vue</a> -->
											<a href="/audit">审计</a>
										</div>
									</el-col>
									<el-col :xs="12" :lg="9" :md="9" :sm="14" :xl="9">
										<div class="right-box">
											<el-dropdown>
												<div >
													<span style="cursor: pointer;">
														<span style="margin-left: 5px">
															用户名
														</span>
														<el-icon>
															<arrow-down />
														</el-icon>
													</span>
												</div>
												<template #dropdown>
													<el-dropdown-menu>
														<el-dropdown-item @click="logout">
															退出登录
														</el-dropdown-item>
													</el-dropdown-menu>
												</template>
											</el-dropdown>
										</div>
									</el-col>
								</el-row>
							</el-header>
						</el-col>
					</el-row>
				</el-header>
				<el-main>
					<!-- 主应用容器 -->
					<!-- 主应用渲染区，用于挂载主应用路由触发的组件 -->
					<router-view></router-view>
					<!-- 子应用容器 -->
					<!-- <div id="vue"></div> -->
					<div id="audit"></div>
				</el-main>
			</el-container>
			<!-- <div id="audit"></div> -->
		</el-container>
	</div>
</template>

<script setup>
	import { computed, ref, watch, nextTick, onMounted } from 'vue'
	import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
	import { useStore } from 'vuex'
	import action from './action'
	
	const router = useRouter()
	const route = useRoute()
	const store = useStore()

	const screenHeight = ref('')
	screenHeight.value = document.documentElement.clientHeight

	const active = ref('')

	const token = computed(() => {
		return store.state.user.token;
	})

	// const hh = onMounted(() => {
	// 	console.log('1111')
	// })

	const isChildren = ref(false)
	const judgeRoute = watch(() => route.path,() => {
		// console.log(store.state.user.token)
		// console.log(route.path)
		// console.log(route.path.indexOf('audit'))
		action.onGlobalStateChange((state) => {
				console.log('1111')
                console.log(state)
				state.menu.forEach((value, i) => {
					value.path = 'audit/' + value.path
					
					if (value.children && value.children.length>0) {
						value.children.forEach((svalue, si) => {
							svalue.path = 'audit/' + svalue.path
						})
					}
				})
				menuList.value = state.menu
            }, true);
		if (route.path.indexOf('audit') > 0) {
			console.log('子应用')
			isChildren.value = true
		} else {
			console.log('主应用')
			isChildren.value = false
			getMenuList()
		}
		// if (!store.state.user.token) {
		// 	router.push('/login')
		// } else {
		// 	 if (route.path == '/login') {
		// 		router.push('/dashboard')
		// 	} else {
			
		// 	}
		// }
	})

	

	// const transitionName = ref('slide-left')
	const isCollapse = ref(false)

	const toggleCollapse = () => {
		isCollapse.value = !isCollapse.value;
	}
	
	const selectMenuItem = (index) => {
		router.push(index)
	}
	
	const menuList = ref([])
	const getMenuList = () => {
		menuList.value = [
        {
     
          key: 'Home',
		  meta: {
			  title: '主应用-主页'
		  },
          icon: 'el-icon-location',
          path: 'dashboard'
        },
        {
     
          key: 'About',
		  meta: {
			  title: '主应用-关于'
		  },
          icon: 'el-icon-location',
          path: 'protocol'
        }
      ]
		// menuList.value = JSON.parse(localStorage.getItem('menuList'))
	}
	getMenuList()
	
	const logout = () => {
		store.commit("user/userLogout")
		router.push('/login')
	}
</script>

<style scoped>
	body {
		margin: 0 auto;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
	}
	.header-cont {
		/* padding: 0 10px; */
		background-color: #fff;
		padding: 0 !important;
	}
	
	.main-content {
		overflow: visible;
		position: relative;
	}
	
	.menu-total {
		cursor: pointer;
		font-size: 24px;
		color: #000000;
		margin-top: 16px;
	}
	
	.breadcrumb {
		height: 60px;
		line-height: 60px;
		display: inline-block;
		padding: 0;
		margin-left: 50px;
		font-size: 16px;
	}

	.breadcrumb a:nth-child(1) {
		padding-right: 20px;
	}
	
	.right-box {
		padding-top: 24px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.el-side .el-menu {
		border-right: none;
	}
</style>
