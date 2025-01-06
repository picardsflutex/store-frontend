import { InputProps } from '../Input/InputProps.type'

export interface LabeledInputProps extends InputProps {
	label: string
	type: string
	errors?: string
	required?: boolean
}
