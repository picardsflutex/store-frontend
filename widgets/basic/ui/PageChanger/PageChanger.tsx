import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import styles from './styles.module.css'

interface PageChangerProps {
	page: number
	onPageChange: (newPage: number) => void
	hasNextPage: boolean
}

export const PageChanger = ({
	page,
	onPageChange,
	hasNextPage,
}: PageChangerProps) => {
	return (
		<div className={styles.pageChanger}>
			<button
				className={styles.pageChangerButton}
				disabled={page === 1}
				onClick={() => onPageChange(page - 1)}
			>
				<MdNavigateBefore />
			</button>
			<span className={styles.pageChangerInfo}>{page}</span>
			<button
				className={styles.pageChangerButton}
				disabled={hasNextPage}
				onClick={() => onPageChange(page + 1)}
			>
				<MdNavigateNext />
			</button>
		</div>
	)
}
