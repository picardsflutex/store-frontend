'use client'

import { axiosPrivate, axiosPublic } from '@/axios'
import { ItemDetails } from '@/features/cart'
import { Button } from '@/shared'
import useCartStore from '@/stores/cart/cart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function Chekout() {
	const { cart, clearCart } = useCartStore(state => state)
	const [itemsDetails, setItemsDetails] = useState<Record<number, ItemDetails>>(
		{}
	)
	const router = useRouter()

	useEffect(() => {
		const fetchItemDetails = async () => {
			const fetchedDetails: Record<number, ItemDetails> = {}
			await Promise.all(
				cart.map(async item => {
					const response = await axiosPublic.get(
						`/api/v1/items/${item.item_id}`
					)
					const data = response.data
					fetchedDetails[item.item_id] = {
						id: data.id,
						description: data.description,
						name: data.name,
						price: data.price,
					}
				})
			)
			setItemsDetails(fetchedDetails)
		}

		if (cart.length > 0) {
			fetchItemDetails()
		}
	}, [cart])

	const totalAmount = cart.reduce((sum, item) => {
		const details = itemsDetails[item.item_id]
		if (!details) return sum
		return sum + item.quantity * details.price
	}, 0)

	const handleOrder = async () => {
		try {
			await axiosPrivate.post('/api/v1/orders', { items: [...cart] })

			clearCart()
			router.push('/orders')
		} catch (error) {
			alert(error)
		}
	}

	return (
		<div className={styles.checkoutPage}>
			<h1 className={styles.checkoutTitle}>Оформлення замовлення</h1>

			{cart.length === 0 ? (
				<div className={styles.checkoutClear}>
					<p>Ваша корзина порожня</p>
					<Button
						className={styles.checkoutButton}
						onClick={() => router.push('/')}
					>
						Переглянути товари
					</Button>
				</div>
			) : (
				<>
					<ul className={styles.itemList}>
						{cart.map(item => {
							const details = itemsDetails[item.item_id]
							if (!details) {
								return (
									<li key={item.item_id} className={styles.item}>
										<div>Загрузка данных для товара...</div>
									</li>
								)
							}

							return (
								<li key={details.id} className={styles.item}>
									<div className={styles.itemDetails}>
										<span className={styles.itemName}>{details.name}</span>
										<span className={styles.itemPrice}>
											{item.quantity} x ${details.price} = $
											{item.quantity * details.price}
										</span>
									</div>
								</li>
							)
						})}
					</ul>

					<div className={styles.total}>
						<h2>Загальна сума: ${totalAmount.toFixed(2)}</h2>
					</div>
					<Button
						buttonStyle='success'
						onClick={handleOrder}
						className={styles.orderButton}
					>
						Оформити замовлення
					</Button>
				</>
			)}
		</div>
	)
}
