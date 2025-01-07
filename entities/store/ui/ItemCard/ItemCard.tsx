import { Counter } from '@/shared'
import type { IItem } from '../..'
import styles from './styles.module.css'

export const ItemCard = ({ id, name, description, price }: IItem) => {
	return (
		<div className={styles.itemCard}>
			<div className={styles.infoSection}>
				<h3>{name}</h3>
				<p>{description}</p>
			</div>
			<div className={styles.infoSection}>
				<p>Price: ${price}</p>
				<Counter id={id} />
			</div>
		</div>
	)
}
