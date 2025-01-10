'use client'

import debounce from 'lodash.debounce'
import { useMemo, useState } from 'react'
import styles from './styles.module.css'
import { IoMdSearch } from 'react-icons/io'

export const SearchBar = ({
	onSearch,
}: {
	onSearch: (query: string) => void
}) => {
	const [query, setQuery] = useState('')

	const debouncedSearch = useMemo(
		() =>
			debounce((value: string) => {
				onSearch(value) // Выполняется только после задержки
			}, 500),
		[onSearch]
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		debouncedSearch(e.target.value) // Передаем значение в отложенную функцию
	}

	return (
		<div className={styles.searchBar}>
			<input
				className={styles.searchInput}
				type='text'
				value={query}
				placeholder='Search...'
				onChange={handleChange}
			/>
			<IoMdSearch className={styles.searchIcon} />
		</div>
	)
}
