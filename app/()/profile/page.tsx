'use client'

import { ProfileInfo } from '@/widgets/authentification'
import { OrderContainer } from '@/widgets/items'
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
