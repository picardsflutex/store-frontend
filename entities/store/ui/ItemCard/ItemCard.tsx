import useCartStore from '@/stores/cart/cart'
import type { IItem } from '../..'

export const ItemCard = ({ id, name, description, price }: IItem) => {
	const addToCart = useCartStore(state => state.addToCart)

	return (
		<div className='item-card'>
			<h2>{name}</h2>
			<p>{description}</p>
			<p>Price: ${price}</p>
			<button onClick={() => addToCart(id)}>Add to Cart</button>
		</div>
	)
}
