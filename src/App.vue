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
			<el-aside :width="isCollapse ? '64px' : '200px'">
				<div style="display: flex;align-items: center;justify-content: center;height: 62px;background-color: #2f3447;color: #ffffff;">
					<h3>
						<svg-icon icon-class="user"></svg-icon>
					</h3>
					<h3 v-if="!isCollapse" style="margin-top: 14px">&ensp;后台管理</h3>
				</div>
				<el-menu class="el-menu-vertical-demo"
						 :collapse="isCollapse"
						 :collapse-transition="false"
						 @open="handleOpen"
						 @close="handleClose">
					<el-sub-menu index="1">
						<template #title>
						<el-icon><location /></el-icon>
						<span>Navigator One</span>
						</template>
						<el-menu-item-group>
						<template #title><span>Group One</span></template>
						<el-menu-item index="1-1">item one</el-menu-item>
						<el-menu-item index="1-2">item two</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="Group Two">
						<el-menu-item index="1-3">item three</el-menu-item>
						</el-menu-item-group>
						<el-sub-menu index="1-4">
						<template #title><span>item four</span></template>
						<el-menu-item index="1-4-1">item one</el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
					<el-menu-item index="2">
						<el-icon><Menu /></el-icon>
						<template #title>Navigator Two</template>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<el-icon><document /></el-icon>
						<template #title>Navigator Three</template>
					</el-menu-item>
					<el-menu-item index="4">
						<el-icon><setting /></el-icon>
						<template #title>Navigator Four</template>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<!-- <a href="/index">base</a>
					<a href="/vue">vue</a> -->
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
											<a href="/index">主应用base</a>
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
	import { computed, ref, onMounted, nextTick } from 'vue'
	// import { useRouter, useRoute } from 'vue-router'
	import { useRouter } from 'vue-router'
	
	const router = useRouter()
	
	const transitionName = ref('slide-left')
	const isCollapse = ref(false)
	const toggleCollapse = () => {
		isCollapse.value = !isCollapse.value;
	}
	
	const handleOpen = () => {
		
	}
	
	const handleClose = () => {
		
	}
	
	const logout = () => {
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
</style>
