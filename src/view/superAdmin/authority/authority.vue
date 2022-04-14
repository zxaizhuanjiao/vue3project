<template>
	<div>
		<div style="padding-bottom: 10px;">
			<el-button type="primary" icon="Plus" @click="addFunc('0')">
				新增角色
			</el-button>
		</div>
		<div>
			<el-table :data="tableData" style="width: 100%">
    			<el-table-column prop="authorityId" label="角色ID" min-widthwidth="180" />
    			<el-table-column prop="authorityName" label="角色名称" min-width="180" />
				<el-table-column label="操作" width="460">
					<template #default="scope">
						<el-button type="text" size="small">
							设置权限
						</el-button>
						<el-button type="text" size="small" @click="editFunc(scope.row)">
							编辑
						</el-button>
						<el-button type="text" size="small" @click="deleteFunc(scope.row)">
							删除
						</el-button>
					</template>
				</el-table-column>
  			</el-table>
		</div>
	</div>
</template>

<script setup>
    import {
		getAuthorityList,
		updateAuthority,
		deleteAuthority
	} from '../../../api/superAdmin'
	import { ref } from 'vue'
	import { ElMessage, ElMessageBox } from 'element-plus'

	const tableData = ref([])
	const page = ref(1)
	const pageSize = ref(999)
	const total = ref(0)
	// const searchInfo = ref('')
	const getTableList = async() => {
		let tmpdata = {
			page: page.value,
			pageSize: pageSize.value
		}
		let res = await getAuthorityList(tmpdata)
		if (res.code === 0) {
			tableData.value = res.data.list
			total.value = res.data.total
		}
	}
	getTableList()

	// 新增
	const addFunc = (parentId) => {
		console.log(parentId)
	}

	// 编辑
	const editFunc = (row) => {
		console.log(row)
	}

	const deleteFunc = (row) => {
		ElMessageBox.confirm('此操作将永久删除该角色, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(async() => {
			// let res = await deleteAuthority()
			// console.log(res)
		})
	}
</script>

<style>
</style>
