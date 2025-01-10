import { IUser } from '@/widgets/user'
import Link from 'next/link'
import styles from './styles.module.css'

export const UserCard = ({ user }: { user: IUser }) => {
	const { email, first_name, id, last_name, role } = user
	return (
		<div className={styles.card}>
			<h2 className={styles.name}>
				{first_name} {last_name}
			</h2>
			<p className={styles.info}>ID: {id}</p>
			<p className={styles.info}>Email: {email}</p>
			<p className={styles.info}>Role: {role}</p>
			<Link className={styles.link} href={`/manage/users/${id}`}>
				Edit
			</Link>
		</div>
	)
}
