'use client'

import { axiosPublic } from '@/axios'
import { loginData, registerData } from '../interfaces/auth.type'

export const handleRegister = async ({
	password,
	password_confirmation,
	...rest
}: registerData) => {
	try {
		if (password !== password_confirmation) {
			throw new Error('Passwords do not match')
		}

		const response = await axiosPublic.post('/user/register', {
			user: {
				password,
				...rest,
			},
		})

		const { data } = response
		const accessToken = response.headers['authorization']
		if (accessToken) {
			localStorage.setItem('accessToken', accessToken)
		}
		return data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw error.response?.data || error.message
	}
}

export const handleLogin = async (data: loginData) => {
	try {
		const response = await axiosPublic.post('/user/login', { user: data })

		const { data: userData } = response
		const accessToken = response.headers['authorization']
		if (accessToken) {
			localStorage.setItem('accessToken', accessToken)
		}
		return userData
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw error.response?.data || error.message
	}
}

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem('accessToken')
	return !!token
}

export const logout = () => {
	try {
		localStorage.removeItem('accessToken')
		window.location.href = '/login'
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw error.response?.data || error.message
	}
}
