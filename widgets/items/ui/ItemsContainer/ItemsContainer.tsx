'use client'

import { axiosPublic } from '@/axios'
import { IItem, ItemCard } from '@/entities/store'
import { PageChanger, SearchBar } from '@/widgets/basic'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const ItemsContainer = ({
	isModeration,
}: {
	isModeration?: boolean
}) => {
	const [items, setItems] = useState<IItem[]>([])
	const [error, setError] = useState<string | null>(null)
	const [page, setPage] = useState<number>(1)

	const fetchItems = async (query: string) => {
		setError(null)

		try {
			const response = await axiosPublic.get('/api/v1/items', {
				params: {
					query,
					page,
				},
			})
			setItems(response.data)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setError(error.response?.data?.error || error.message)
		}
	}

	useEffect(() => {
		fetchItems('')
	}, [page])

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
	}

	return (
		<section className={styles.itemsContainer}>
			<SearchBar onSearch={fetchItems} />
			<div className={styles.itemsList}>
				{items?.map((item: IItem) => (
					<ItemCard key={item.id} isModeration={isModeration} item={item} />
				))}
			</div>

			<PageChanger
				page={page}
				hasNextPage={items?.length < 10}
				onPageChange={handlePageChange}
			/>
		</section>
	)
}
