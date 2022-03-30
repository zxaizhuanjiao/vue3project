import service from '../utils/request.js'

export const getMenuList = (data) => {
	return service({
		url: '/menu/getMenu',
		method: 'post',
		data
	})
}