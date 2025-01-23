'use client'

import { axiosPrivate } from '@/axios'
import { ItemDetails } from '@/features/cart'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

interface Order {
	id: number
	amount: number
	items: { item_id: number; quantity: number; price: string }[]
}

export const OrderContainer = () => {
	const [orders, setOrders] = useState<Order[]>([])
	const [itemsDetails, setItemsDetails] = useState<Record<number, ItemDetails>>(
		{}
	)
	const [loadingOrders, setLoadingOrders] = useState(true)

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axiosPrivate.get('/api/v1/orders')
				const ordersData = response.data.reverse()
				setOrders(ordersData)

				const itemIds = new Set<number>()
				ordersData.forEach((order: Order) => {
					order.items.forEach(item => itemIds.add(item.item_id))
				})

				const fetchedItemsDetails: Record<number, ItemDetails> = {}
				await Promise.all(
					Array.from(itemIds).map(async itemId => {
						const itemResponse = await axiosPrivate.get(
							`/api/v1/items/${itemId}`
						)
						fetchedItemsDetails[itemId] = itemResponse.data
					})
				)
				setItemsDetails(fetchedItemsDetails)
			} catch (error) {
				console.error('Error fetching orders or item details:', error)
			} finally {
				setLoadingOrders(false)
			}
		}

		fetchOrders()
	}, [])

	return (
		<section className={styles.ordersSection}>
			<h2 className={styles.orderTitle}>Ваші замовлення</h2>
			{loadingOrders ? (
				<p className={styles.orderInfo}>Завантаження замовлень...</p>
			) : orders.length === 0 ? (
				<p className={styles.orderInfo}>Замовлення відсутні.</p>
			) : (
				<ul className={styles.ordersList}>
					{orders.map(order => (
						<li key={order.id} className={styles.orderItem}>
							<details>
								<summary>
									<header className={styles.orderHeader}>
										Замовлення #{order.id}
									</header>
								</summary>
								<ul className={styles.orderDetails}>
									{order.items.map((item, index) => {
										const details = itemsDetails[item.item_id]
										return (
											<li key={index}>
												{details ? (
													<>
														<strong>{details.name}</strong>: {item.quantity} шт.
													</>
												) : (
													<p>Завантаження товару...</p>
												)}
											</li>
										)
									})}
								</ul>
								<footer className={styles.orderFooter}>
									Сума: ${order.amount}
								</footer>
							</details>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}
