import useCartStore from '@/stores/cart/cart'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import styles from './styles.module.css'

const Counter = ({ id }: { id: number }) => {
	const { cart, changeValueCart, updateQuantity } = useCartStore(state => state)
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(e.target.value, 10)
		if (!isNaN(newQuantity) && newQuantity >= 0) {
			updateQuantity(id, newQuantity)
		}
	}
	const currentQuantity = cart.find(item => item.item_id === id)?.quantity || 0

	return (
		<div className={styles.counterContainer}>
			<button
				className={styles.cartChangeButton}
				onClick={() => changeValueCart(id, 1)}
			>
				<FaPlus />
			</button>
			<input
				type='number'
				name='counter'
				id='counter'
				className={styles.cartCounter}
				value={currentQuantity}
				onChange={handleInputChange}
			/>
			<button
				className={styles.cartChangeButton}
				onClick={() => changeValueCart(id, -1)}
			>
				<FaMinus />
			</button>
		</div>
	)
}

export default Counter
