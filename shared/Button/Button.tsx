'use client'

import classNames from 'classnames'
import { ButtonProps } from './ButtonProps.type'
import styles from './styles.module.css'

const Button = ({
	className,
	buttonStyle = 'primary',
	children,
	isLoading = false,
	...rest
}: ButtonProps) => {
	return (
		<button
			className={classNames(className, styles.ButtonDefault, buttonStyle)}
			disabled={isLoading}
			{...rest}
		>
			{!isLoading ? children : 'Loading...'}
		</button>
	)
}

export default Button
