'use client'

import { Counter } from '@/shared'
import useUserStore from '@/stores/user/user'
import Link from 'next/link'
import type { IItem } from '../..'
import styles from './styles.module.css'

interface IItemCard {
	isModeration?: boolean
	item: IItem
}

export const ItemCard = ({ isModeration, item }: IItemCard) => {
	const { user } = useUserStore()
	const isAdmin = user?.role === 'admin'
	const { description, id, name, price } = item

	return (
		<div className={styles.itemCard}>
			<div className={styles.infoSection}>
				<h2>{name}</h2>
				<p>{description}</p>
			</div>
			<div className={styles.mutableInfoSection}>
				<div className={styles.infoSection}>
					<p>Price: ${price}</p>
					<Counter id={id} />
				</div>
				{isAdmin && isModeration && (
					<div>
						<Link className={styles.editLink} href={`/manage/items/${id}`}>
							Редагувати
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
