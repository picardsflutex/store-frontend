import classNames from 'classnames'
import { InputProps } from './InputProps.type'
import styles from './styles.module.css'

const Input = ({
	className,
	inputSize = 'medium',
	disabled,
	children,
	maxLength = 500,
	...rest
}: InputProps) => {
	return (
		<input
			className={classNames(
				className,
				styles.DefaultInput,
				inputSize,
				disabled && 'disabled'
			)}
			maxLength={maxLength <= 500 ? maxLength : 500}
			{...rest}
		>
			{children}
		</input>
	)
}

export default Input
