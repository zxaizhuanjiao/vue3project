import service from '../utils/request.js'

export const login = (data) => {
	return service({
		url: '/base/login',
		method: 'post',
		data
	})
}