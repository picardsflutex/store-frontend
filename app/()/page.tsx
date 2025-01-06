'use client'

import { axiosPublic } from '@/axios'
import { IItem, ItemCard } from '@/entities/store'
import { useEffect, useState } from 'react'

export default function Home() {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await axiosPublic.get('/api/v1/items')
				setItems(response.data)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				setError(error.response?.data || error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchItems()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<main>
			{items.map((item: IItem) => (
				<ItemCard
					key={item.id}
					id={item.id}
					name={item.name}
					description={item.description}
					price={item.price}
				/>
			))}
		</main>
	)
}
