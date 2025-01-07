import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
	item_id: number
	quantity: number
}

interface CartState {
	cart: CartItem[]
	changeValueCart: (itemId: number, quantity: number) => void
	removeFromCart: (itemId: number) => void
	updateQuantity: (itemId: number, quantity: number) => void
	clearCart: () => void
}

const useCartStore = create<CartState>()(
	persist(
		set => ({
			cart: [],
			changeValueCart: (itemId: number, quantity: number) =>
				set((state: CartState) => {
					const existingItem = state.cart.find(
						cartItem => cartItem.item_id === itemId
					)

					if (existingItem) {
						const newQuantity = existingItem.quantity + quantity
						if (newQuantity <= 0) {
							return {
								cart: state.cart.filter(
									cartItem => cartItem.item_id !== itemId
								),
							}
						}

						return {
							cart: state.cart.map(cartItem =>
								cartItem.item_id === itemId
									? { ...cartItem, quantity: newQuantity }
									: cartItem
							),
						}
					} else {
						if (quantity <= 0) return state
						return {
							cart: [...state.cart, { item_id: itemId, quantity }],
						}
					}
				}),
			removeFromCart: (itemId: number) =>
				set((state: CartState) => ({
					cart: state.cart.filter(cartItem => cartItem.item_id !== itemId),
				})),
			updateQuantity: (itemId: number, quantity: number) =>
				set((state: CartState) => {
					if (quantity <= 0) {
						return {
							cart: state.cart.filter(cartItem => cartItem.item_id !== itemId),
						}
					}
					return {
						cart: state.cart.map(cartItem =>
							cartItem.item_id === itemId ? { ...cartItem, quantity } : cartItem
						),
					}
				}),
			clearCart: () => set({ cart: [] }),
		}),
		{
			name: 'cart-storage',
		}
	)
)

export default useCartStore
