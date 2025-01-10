import { axiosPublic } from '@/axios'
import { IItem } from '@/entities/store'
import { ItemEdit } from '@/widgets/items'

export default async function EditItem({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id
	const response = await axiosPublic.get(`/api/v1/items?query=${id}`)
	const item = response.data[0] as IItem

	return <ItemEdit item={item} />
}
