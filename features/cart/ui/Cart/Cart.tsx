import { axiosPublic } from '@/axios'
import { Button, Counter } from '@/shared'
import useCartStore from '@/stores/cart/cart'
import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaCartShopping, FaRegTrashCan } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import styles from './styles.module.css'

interface ItemDetails {
	id: number
	name: string
	price: number
}

export const Cart = () => {
	const { cart, clearCart } = useCartStore(state => state)
	const [isOpen, setIsOpen] = useState(false)
	const [itemsDetails, setItemsDetails] = useState<Record<number, ItemDetails>>(
		{}
	)

	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	useEffect(() => {
		const fetchItemDetails = async () => {
			const fetchedDetails: Record<number, ItemDetails> = {}
			await Promise.all(
				cart.map(async item => {
					const response = await axiosPublic.get(`/api/v1/items/${item.id}`)
					const data = response.data
					fetchedDetails[item.id] = {
						id: data.id,
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

	return (
		<>
			<Button onClick={openModal} buttonStyle='subtle'>
				<FaCartShopping />
			</Button>

			<Dialog open={isOpen} onClose={closeModal}>
				<div className={styles.cartBackground} />
				<Dialog.Panel className={styles.cart}>
					<Dialog.Title className={styles.cartTitle}>Корзина</Dialog.Title>

					{cart.length === 0 ? (
						<p className={styles.emptyCart}>Корзина пуста</p>
					) : (
						<ul className={styles.itemList}>
							{cart.map(item => {
								const details = itemsDetails[item.id]
								if (!details) return null
								const currentQuantity = item.quantity
								const total = details.price * currentQuantity

								return (
									<li key={item.id} className={styles.cartItem}>
										<div className={styles.itemDetails}>
											<div>{details.name}</div>
										</div>
										<div className={styles.itemDetails}>
											<Counter id={item.id} />
											<div className={styles.itemSum}>
												Сумма: ${total.toFixed(2)}
											</div>
										</div>
									</li>
								)
							})}
						</ul>
					)}

					<div className={styles.buttonsContainer}>
						<Button onClick={clearCart}>
							<FaRegTrashCan /> Видалити все
						</Button>
						<Link className={styles.orderlink} href='/checkout'>
							Перейти до оформлення
						</Link>
					</div>
					<Button
						className={styles.closeButton}
						buttonStyle='subtle'
						onClick={closeModal}
					>
						<IoClose />
					</Button>
				</Dialog.Panel>
			</Dialog>
		</>
	)
}
