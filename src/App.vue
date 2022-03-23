<template>
	<div>
		<a href="/">base</a>
		      <!-- 子应用 vue app -->
		<a href="/vue">vue</a>
		      <!-- 主应用容器 -->
		<router-view></router-view>
		      <!-- 子应用容器 -->
		<div id="container"></div>
	</div>
</template>

<script>
	export default {
		name: 'App'
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
</style>
