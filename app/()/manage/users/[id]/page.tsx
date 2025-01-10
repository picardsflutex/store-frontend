import { axiosPublic } from '@/axios'
import { IUser, UserEdit } from '@/widgets/user'

export default async function EditUser({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const response = await axiosPublic.get(`/api/v1/users?query=${id}`)
	const user = response.data.data[0] as IUser

	return <UserEdit user={user} />
}
