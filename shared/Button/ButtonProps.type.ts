type buttonStyles =
	| 'primary'
	| 'disabled'
	| 'neutral'
	| 'subtle'
	| 'danger'
	| 'warning'
	| 'success'

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	buttonStyle?: buttonStyles
	isLoading?: boolean
}
