<template>
	<div style="padding-top: 130px;">
		<el-form 
			ref="loginForm" 
			:model="loginFormData" 
			label-width="100px" 
			@keyup.enter="submitForm()"
			style="width: 400px;margin: 0 auto;"
		>
		    <el-form-item label="用户名" prop="age">
				<el-input v-model="loginFormData.username" type="text" autocomplete="off" />
		    </el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model.number="loginFormData.password" type="text" autocomplete="off" />
			</el-form-item>
		    <el-form-item>
				<el-button type="primary" size="large" @click="submitForm()" style="width: 100%;">
					登录
				</el-button>
		    </el-form-item>
		  </el-form>
	</div>
</template>

<script setup>
	import { reactive, ref } from 'vue'
	import { ElMessage } from 'element-plus'
	import { useRouter } from 'vue-router'
	
	const router = useRouter()
	
	const loginForm = ref(null)
	const loginFormData = reactive({
	  username: 'admin',
	  password: '123456',
	  captcha: '',
	  captchaId: '',
	})
	
	const submitForm = () => {
		loginForm.value.validate((v) => {
			if (v) {
				// console.log(v)
				// console.log(loginFormData.username)
				sessionStorage.setItem("name", loginFormData.username)
				router.push('/home')
			}
		})
	}
	
</script>

<style>
</style>
