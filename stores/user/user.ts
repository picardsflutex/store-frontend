import { IUser } from '@/widgets/authentification'
import { create } from 'zustand'

interface UserState {
	user: IUser | null // Текущее состояние пользователя
	isAuthenticated: boolean // Флаг, авторизован ли пользователь
	setUser: (user: IUser) => void // Установить пользователя
	clearUser: () => void // Очистить данные пользователя
}

const useUserStore = create<UserState>(set => ({
	user: null,
	isAuthenticated: false,
	setUser: user =>
		set(() => ({
			user,
			isAuthenticated: true,
		})),
	clearUser: () =>
		set(() => ({
			user: null,
			isAuthenticated: false,
		})),
}))

export default useUserStore
