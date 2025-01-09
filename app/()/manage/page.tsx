import { ManageMenu } from '@/widgets/basic'
import styles from './styles.module.css'

export default function Manage() {
	return (
		<main className={styles.managePanel}>
			<ManageMenu />
		</main>
	)
}
