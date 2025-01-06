import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
	id: number
	quantity: number
}

interface CartState {
	cart: CartItem[]
	addToCart: (itemId: number, quantity?: number) => void
	removeFromCart: (itemId: number) => void
	updateQuantity: (itemId: number, quantity: number) => void
	clearCart: () => void
}

const useCartStore = create<CartState>()(
	persist(
		set => ({
			cart: [],
			addToCart: (itemId: number, quantity = 1) =>
				set((state: CartState) => {
					const existingItem = state.cart.find(
						cartItem => cartItem.id === itemId
					)
					if (existingItem) {
						return {
							cart: state.cart.map(cartItem =>
								cartItem.id === itemId
									? { ...cartItem, quantity: cartItem.quantity + quantity }
									: cartItem
							),
						}
					} else {
						return {
							cart: [...state.cart, { id: itemId, quantity }],
						}
					}
				}),
			removeFromCart: (itemId: number) =>
				set((state: CartState) => ({
					cart: state.cart.filter(cartItem => cartItem.id !== itemId),
				})),
			updateQuantity: (itemId: number, quantity: number) =>
				set((state: CartState) => ({
					cart: state.cart.map(cartItem =>
						cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
					),
				})),
			clearCart: () => set({ cart: [] }),
		}),
		{
			name: 'cart-storage',
		}
	)
)

export default useCartStore
