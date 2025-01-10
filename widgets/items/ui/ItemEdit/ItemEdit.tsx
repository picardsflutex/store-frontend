'use client'

import { axiosPrivate } from '@/axios'
import { IItem } from '@/entities/store'
import { Button, LabeledInput } from '@/shared'
import { useActionState } from 'react'
import styles from './styles.module.css'

interface SubmitState {
	data: IItem | null
	error: Error | null
}

export const ItemEdit = ({ item }: { item: IItem }) => {
	const handleSubmit = async (prevState: SubmitState, formData: FormData) => {
		try {
			const name = formData.get('name')?.toString()
			const description = formData.get('description')?.toString()
			const price = formData.get('price')

			if (!name && !description && !price)
				throw new Error('Fill in all fields.')

			const { data } = await axiosPrivate.put(`/api/v1/items/${item.id}`, {
				item: { name, description, price },
			})
			return { data, error: null }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return { ...prevState, error }
		}
	}

	const [state, submit, isLoading] = useActionState(handleSubmit, {
		data: item,
		error: null,
	})
	if (!item) return <section>Data load error</section>

	return (
		<section className={styles.itemEditSection}>
			<form className={styles.itemEditForm} action={submit}>
				<LabeledInput
					id='name'
					label='Name'
					type='text'
					name='name'
					defaultValue={state.data.name}
				/>
				<LabeledInput
					id='description'
					label='Description'
					type='text'
					name='description'
					defaultValue={state.data.description}
				/>
				<LabeledInput
					className={styles.itemEditInput}
					id='price'
					label='Price'
					type='number'
					name='price'
					defaultValue={state.data.price}
				/>
				<Button type='submit' isLoading={isLoading}>
					Save
				</Button>
			</form>
		</section>
	)
}
