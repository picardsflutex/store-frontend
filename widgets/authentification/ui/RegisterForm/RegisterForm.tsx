'use client'

import { Button, LabeledInput } from '@/shared'
import useUserStore from '@/stores/user/user'
import Link from 'next/link'
import { useActionState } from 'react'
import { handleRegister, IUser } from '../..'
import styles from './styles.module.css'

interface SubmitState {
	data: IUser | null
	error: Error | null
}

export const RegisterForm = () => {
	const setUser = useUserStore(state => state.setUser)

	const handleSubmit = async (prevState: SubmitState, formData: FormData) => {
		try {
			const first_name = formData.get('first_name')?.toString() || ''
			const last_name = formData.get('last_name')?.toString() || ''
			const email = formData.get('email')?.toString() || ''
			const password = formData.get('password')?.toString() || ''
			const password_confirmation =
				formData.get('password_confirmation')?.toString() || ''

			if (!email || !password) {
				throw new Error('Please fill in all fields')
			}

			const data = await handleRegister({
				first_name,
				last_name,
				email,
				password,
				password_confirmation,
			})
			setUser(data.data)
			return { data, error: null }
		} catch (error: any) {
			return { ...prevState, error }
		}
	}

	const [state, submit, isPending] = useActionState(handleSubmit, {
		data: null,
		error: null,
	})

	return (
		<section>
			<form className={styles.registerForm} action={submit}>
				<h2>Register</h2>
				<div className={styles.namesInputGroup}>
					<LabeledInput
						className={styles.namesInput}
						id='first_name'
						label='First name'
						type='text'
						name='first_name'
						required
					/>
					<LabeledInput
						className={styles.namesInput}
						id='last_name'
						label='Last name'
						type='text'
						name='last_name'
						required
					/>
				</div>
				<LabeledInput
					id='email'
					label='Email'
					type='email'
					name='email'
					required
				/>
				<LabeledInput
					id='password'
					label='Password'
					type='password'
					name='password'
					required
				/>
				<LabeledInput
					id='password_confirmation'
					label='Confirmate password'
					type='password'
					name='password_confirmation'
					required
				/>
				<Button
					type='submit'
					className={styles.buttonForm}
					isLoading={isPending}
				>
					Register
				</Button>
				<p className={styles.registerLink}>
					Have an account? <Link href='/login'>Login now.</Link>
				</p>
			</form>
		</section>
	)
}
