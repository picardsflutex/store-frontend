'use client'

import { OrderContainer } from '@/widgets/items'
import { ProfileInfo } from '@/widgets/user'
import styles from './styles.module.css'

export default function Profile() {
	return (
		<main>
			<h1 className={styles.profileTitle}>Профіль</h1>
			<ProfileInfo />
			<OrderContainer />
		</main>
	)
}
