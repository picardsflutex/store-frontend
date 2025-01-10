'use client'

import { axiosPrivate } from '@/axios'
import { UserCard } from '@/entities/store'
import { PageChanger, SearchBar } from '@/widgets/basic'
import { useEffect, useState } from 'react'
import { IUser } from '../../interfaces/user.type'
import styles from './styles.module.css'

export const UserContainer = () => {
	const [users, setUsers] = useState<IUser[]>([])
	const [error, setError] = useState<string | null>(null)
	const [page, setPage] = useState<number>(1)

	const fetchUsers = async (query: string) => {
		setError(null)

		try {
			const response = await axiosPrivate.get('/api/v1/users', {
				params: {
					query,
					page,
				},
			})
			setUsers(response.data.data as IUser[])
		} catch (error: any) {
			setError(error.response?.data?.error || error.message)
		}
	}

	useEffect(() => {
		fetchUsers('')
	}, [page])

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
	}

	if (error) return <div>Error: {error}</div>

	return (
		<section className={styles.userContainer}>
			<SearchBar onSearch={fetchUsers} />
			<div className={styles.userList}>
				{users?.map((user: IUser) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
			<PageChanger
				page={page}
				hasNextPage={users?.length < 10}
				onPageChange={handlePageChange}
			/>
		</section>
	)
}
