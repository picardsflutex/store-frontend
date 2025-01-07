'use client'

import { Cart } from '@/features/cart'
import { ROUTES } from '@/routes/routes'
import { Button } from '@/shared'
import useUserStore from '@/stores/user/user'
import { logout } from '@/widgets/authentification'
import Link from 'next/link'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { TiUser } from 'react-icons/ti'
import styles from './styles.module.css'

export const NavMenu = () => {
	const { user } = useUserStore()
	const clearUser = useUserStore(state => state.clearUser)
	const isAdmin = user?.role === 'admin'

	const handleLogout = () => {
		logout()
		clearUser()
	}

	return (
		<nav className={styles.navMenu}>
			<div className={styles.navMenuPart}>
				{ROUTES.filter(route => !route.onlyAdmin || isAdmin).map(route => (
					<Link key={route.href} href={route.href}>
						{route.name}
					</Link>
				))}
			</div>
			<div className={styles.navMenuPart}>
				<Link className={styles.profileIcon} href='/profile'>
					<TiUser />
					{user?.first_name}
				</Link>
				<Cart />
				<Button buttonStyle='subtle' onClick={handleLogout}>
					<RiLogoutBoxRLine />
				</Button>
			</div>
		</nav>
	)
}
