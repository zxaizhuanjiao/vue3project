<template>
	<div>
		<div id="container"></div>
	</div>
</template>

<script>
	import { loadMicroApp } from 'qiankun';
	export default {
		setup(){
			let create = ()=>{
				loadMicroApp({ 
					name: 'vue3', 
					entry: 'http://localhost:7105/',
					container: '#container', 
				});
			}
			return {create};
		}
	}
</script>

<style>
</style>
