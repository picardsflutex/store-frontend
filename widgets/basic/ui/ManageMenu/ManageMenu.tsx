import { MANAGE_ROUTES } from '@/routes/routes'
import Link from 'next/link'
import styles from './styles.module.css'

export const ManageMenu = () => {
	return (
		<section className={styles.manageMenu}>
			{MANAGE_ROUTES.map((route, index) => {
				return (
					<Link className={styles.manageMenuLink} key={index} href={route.href}>
						<route.icon />
						{route.name}
					</Link>
				)
			})}
		</section>
	)
}
