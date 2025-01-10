import { IUser } from '@/widgets/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
	user: IUser | null
	isAuthenticated: boolean
	setUser: (user: IUser) => void
	clearUser: () => void
}

const useUserStore = create<UserState>()(
	persist(
		set => ({
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
		}),
		{
			name: 'user-storage',
			partialize: state => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
)

export default useUserStore
