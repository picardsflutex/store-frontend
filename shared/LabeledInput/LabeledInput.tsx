'use client'

import classNames from 'classnames'
import { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'
import { Input } from '..'
import { LabeledInputProps } from './LabeledInputProps.type'
import styles from './styles.module.css'

const LabeledInput = ({
	id,
	label,
	type,
	required = false,
	errors,
	className,
	...rest
}: LabeledInputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className={classNames(className, styles.inputGroup)}>
			<Input
				id={id as string}
				type={type === 'password' && showPassword ? 'text' : type}
				required={required}
				className={styles.input}
				{...rest}
			/>
			<label htmlFor={id as string} className={styles.inputLabel}>
				{label}
			</label>
			{errors && <span className={styles.inputError}>{errors}</span>}
			{type === 'password' && (
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className={styles.hideButton}
				>
					{!showPassword ? <BiHide /> : <BiShow />}
				</button>
			)}
		</div>
	)
}

export default LabeledInput
