import { BsDatabaseFillGear } from 'react-icons/bs'
import { FaUserGear } from 'react-icons/fa6'

export const ROUTES = [
	{ name: 'Home', href: '/', onlyAdmin: false },
	{ name: 'Manage', href: '/manage', onlyAdmin: true },
]

export const MANAGE_ROUTES = [
	{
		name: 'Manage items',
		href: '/manage/items',
		onlyAdmin: false,
		icon: BsDatabaseFillGear,
	},
	{
		name: 'Manage users',
		href: '/manage/users',
		onlyAdmin: true,
		icon: FaUserGear,
	},
]
