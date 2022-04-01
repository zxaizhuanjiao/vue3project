<template>
	<div>
		<!-- <a href="/index">base</a> -->
		      <!-- 子应用 vue app -->
		<!-- <a href="/vue">vue</a> -->
		      <!-- 主应用容器 -->
		<!-- <router-view></router-view> -->
		      <!-- 子应用容器 -->
		<!-- <div id="vue"></div> -->
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
						 @select="selectMenuItem">
					<!-- 一级菜单 -->
					<template v-for="item in menuList">
						<el-sub-menu :index="item.ID+''" v-if="item.children && item.children.length > 0" :key="item.ID">
							<!-- 一级菜单模板区域 -->
							<template #title>
								<el-icon><location /></el-icon>
								<span>{{ item.meta.title }}</span>
							</template>
							<!-- 二级菜单 -->
							<el-menu-item v-for="subItem in item.children" :index="subItem.ID+''" :key="subItem.ID">
								<template #title>
									<el-icon><location /></el-icon>
									<span>{{ subItem.meta.title }}</span>
								</template>
							</el-menu-item>
						</el-sub-menu>
						<template v-else>
							<!-- 一级菜单模板区域 -->
							<el-menu-item :key="item.ID" :index="item.ID+''">
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
											<a href="/dashboard">主应用base</a>
											<a href="/vue">子应用vue</a>
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
					<router-view></router-view>
					<!-- 子应用容器 -->
					<div id="vue"></div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
	import { computed, ref, watch, nextTick } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import { useStore } from 'vuex'
	
	const router = useRouter()
	const route = useRoute()
	const store = useStore()

	const active = ref('')
	watch(route, () => {
		active.value = route.path
		// console.log(route.path)
	})

	const token = computed(() => {
		return store.state.user.token;
	})

	// console.log($route.path)
	
	const transitionName = ref('slide-left')
	const isCollapse = ref(false)
	const initPage = () => {
		active.value = route.path
		// const screenWidth = document.body.clientWidth
		// if (screenWidth < 1000) {
		// 	isCollapse.value = !isCollapse.value
		// }
	}

	initPage()

	// onUnmounted(() => {
	// 	emitter.off('collapse')
	// 	})

	const toggleCollapse = () => {
		isCollapse.value = !isCollapse.value;
	}
	
	const selectMenuItem = (index) => {
		// console.log(index)
		let tmprouter = ''
		menuList.value.forEach((v, i) => {
			if (v.ID == index) {
				// console.log(v)
				tmprouter = v
			} else {
				if (v.children && v.children.length > 0) {
					v.children.forEach((sv, si) => {
						if (sv.ID == index) {
							// console.log(sv)
							tmprouter = sv
						}
					})
				}
			}
		})
		// console.log(tmprouter)
		router.push('/' + tmprouter.path)
	}
	// const handleOpen = (index) => {
	// 	console.log(route)
	// }
	
	// const handleClose = () => {
		
	// }

	const menuList = ref([])
	const getMenuList = () => {
		menuList.value = JSON.parse(localStorage.getItem('menuList'))
		// console.log(JSON.parse(localStorage.getItem('menuList')))
		// console.log(menuList.value)
	}
	getMenuList()
	
	const logout = () => {
		store.commit('user/setToken', '')
		store.commit('user/setUserInfo', '')
		localStorage.clear()
		router.push('/login')
	}
</script>

<style>
	body {
		margin: 0 auto;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	.header-cont {
		padding: 0 16px;
		background-color: #fff;
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
		/* margin-left: 80px; */
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
