<template>
	<div style="padding-top: 130px;">
		<el-form 
			ref="loginForm" 
			:model="loginFormData"
			:rules="rules"
			label-width="100px" 
			@keyup.enter="submitForm"
			style="width: 400px;margin: 0 auto;"
		>
		    <el-form-item label="用户名" prop="username">
				<el-input v-model="loginFormData.username" autocomplete="off" />
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
	// import { ElMessage } from 'element-plus'
	import { useStore } from "vuex";
	import { useRouter } from 'vue-router'
	import { login } from '../../api/login.js'
	import { getMenuList } from '../../api/menu'
	
	const router = useRouter()
	const store = useStore()

	// 验证函数
	const checkUsername = (rule, value, callback) => {
		if (value.length < 5) {
			return callback(new Error('请输入正确的用户名'))
		} else {
			callback()
		}
	}
	const checkPassword = (rule, value, callback) => {
		if (value.length < 6) {
			return callback(new Error('请输入正确的密码'))
		} else {
			callback()
		}
	}
	
	const loginForm = ref(null)
	const loginFormData = reactive({
	  username: '',
	  password: '',
	  captcha: '',
	  captchaId: '',
	})

	const rules = reactive({
		username: [{ validator: checkUsername, required: true, trigger: 'blur' }],
		password: [{ validator: checkPassword, required: true, trigger: 'blur' }]
	})
	
	const submitForm = () => {
		loginForm.value.validate((v) => {
			if (v) {
				let tmpdata = {
					username: loginFormData.username,
					password: loginFormData.password + ''
				}
				
				login(tmpdata).then(res => {
					if (res.code === 0) {
						store.commit('user/setToken', res.data.token)
						store.commit('user/setUserInfo', JSON.stringify(res.data.user))
						localStorage.setItem("userInfo", JSON.stringify(res.data.user))
						router.push('/index')
						getMenuListFunc()
					}
				})
			}
		})
	}

	const getMenuListFunc = () => {
		getMenuList().then(res => {
			if (res.code === 0) {
				localStorage.setItem("menuList", JSON.stringify(res.data.menus))
			}
		})
	}
	
</script>

<style>
</style>
