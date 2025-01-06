import axios from 'axios'

const axiosPrivate = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

axiosPrivate.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default axiosPrivate
