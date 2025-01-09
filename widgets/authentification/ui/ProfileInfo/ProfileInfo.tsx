'use client'

import { axiosPrivate } from '@/axios'
import { Button, Input } from '@/shared'
import useUserStore from '@/stores/user/user'
import { useActionState, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { IoMdCheckmark } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { IUser } from '../..'
import styles from './styles.module.css'

interface SubmitState {
	data: IUser | null
	error: Error | null
}

const ProfileInfo = () => {
	const { user, setUser } = useUserStore(state => state)
	const [isUpdate, setIsUpdate] = useState<boolean>(false)

	const handleSubmit = async (prevState: SubmitState, formData: FormData) => {
		if (isUpdate)
			try {
				const first_name = formData.get('first_name')?.toString() || ''
				const last_name = formData.get('last_name')?.toString() || ''

				const { data } = await axiosPrivate.put('/user/update', {
					user: { first_name, last_name },
				})
				setUser(data.data)
				return { data, error: null }
			} catch (error: any) {
				return { ...prevState, error }
			} finally {
				setIsUpdate(!isUpdate)
			}
	}

	const [state, submit, isPending] = useActionState(handleSubmit, {
		data: null,
		error: null,
	})

	return (
		<section className={styles.profileSection}>
			<form action={submit} className={styles.form}>
				<div className={styles.inputGroup}>
					<label className={styles.label}>Ім&apos;я: </label>
					{!isUpdate ? (
						<p className={styles.inputField}>{user?.first_name}</p>
					) : (
						<Input
							id='first_name'
							type='text'
							name='first_name'
							defaultValue={user?.first_name}
							required
						/>
					)}
				</div>
				<div className={styles.inputGroup}>
					<label className={styles.label}>Ім&apos;я: </label>
					{!isUpdate ? (
						<p className={styles.inputField}>{user?.last_name}</p>
					) : (
						<Input
							id='last_name'
							type='text'
							name='last_name'
							defaultValue={user?.last_name}
							required
						/>
					)}
				</div>
				<div className={styles.buttonGroup}>
					{isUpdate && (
						<Button type='submit'>
							<IoMdCheckmark />
						</Button>
					)}
					<Button
						className={styles.updateButton}
						onClick={() => setIsUpdate(!isUpdate)}
						type='button'
					>
						{!isUpdate ? <CiEdit /> : <MdClose />}
					</Button>
				</div>
			</form>
		</section>
	)
}

export default ProfileInfo
