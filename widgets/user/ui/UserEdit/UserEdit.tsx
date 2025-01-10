'use client'

import { axiosPrivate } from '@/axios'
import { Button, LabeledInput } from '@/shared'
import { useActionState } from 'react'
import { IUser } from '../..'
import styles from './styles.module.css'

interface SubmitState {
	data: IUser | null
	error: Error | null
}

export const UserEdit = ({ user }: { user: IUser }) => {
	const handleSubmit = async (prevState: SubmitState, formData: FormData) => {
		try {
			const first_name = formData.get('first_name')?.toString() || ''
			const last_name = formData.get('last_name')?.toString() || ''
			const email = formData.get('email')?.toString() || ''
			const role = formData.get('role')?.toString() || ''

			if (!first_name || !last_name || !email || !role)
				throw new Error('Please fill in all fields')

			const response = await axiosPrivate.put(`/user/update/${user.id}`, {
				user: { first_name, last_name, email, role },
			})
			const newUserData = response.data.data as IUser
			return { data: newUserData, error: null }
		} catch (error: any) {
			return { ...prevState, error }
		}
	}

	const [state, submit, isPending] = useActionState(handleSubmit, {
		data: user,
		error: null,
	})

	if (!user) return <section>Data load error</section>

	return (
		<section>
			<form action={submit}>
				<LabeledInput
					id='first_name'
					label='First name'
					type='text'
					name='first_name'
					defaultValue={state.data?.first_name}
					required
				/>
				<LabeledInput
					id='last_name'
					label='Last name'
					type='text'
					name='last_name'
					defaultValue={state.data?.last_name}
					required
				/>
				<LabeledInput
					id='email'
					label='Email'
					type='email'
					name='email'
					defaultValue={state.data?.email}
					required
				/>
				<div className={styles.selectRole}>
					<select
						id='role'
						name='role'
						defaultValue={state.data?.role}
						className={styles.select}
					>
						<option value='user'>User</option>
						<option value='admin'>Admin</option>
					</select>
					<label className={styles.selectLabel} htmlFor='role'>
						Role
					</label>
				</div>
				<Button type='submit' isLoading={isPending}>
					Save
				</Button>
			</form>
		</section>
	)
}
