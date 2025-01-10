'use client'

import { Button, LabeledInput } from '@/shared'
import useUserStore from '@/stores/user/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { handleLogin, IUser } from '../..'
import styles from './styles.module.css'

interface SubmitState {
	data: IUser | null
	error: Error | null
}

export default function LoginForm() {
	const router = useRouter()
	const setUser = useUserStore(state => state.setUser)

	const handleSubmit = async (prevState: SubmitState, formData: FormData) => {
		try {
			const email = formData.get('email')?.toString() || ''
			const password = formData.get('password')?.toString() || ''

			if (!email || !password) {
				throw new Error('Please fill in all fields')
			}

			const data = await handleLogin({ email, password })
			setUser(data.data)
			router.push('/')
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
			<form className={styles.loginForm} action={submit}>
				<h2>Login</h2>
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
				<Button
					type='submit'
					className={styles.buttonForm}
					isLoading={isPending}
				>
					Login
				</Button>
				<p className={styles.registerLink}>
					Don’t have an account? <Link href='/register'>Register now.</Link>
				</p>
			</form>
		</section>
	)
}
