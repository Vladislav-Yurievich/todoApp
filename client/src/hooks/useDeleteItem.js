import { useCookies } from 'react-cookie'
import { deleteData } from '../api/todoApi'

const useDeleteItem = getData => {
	const [cookies] = useCookies(['AuthToken'])

	const deleteItem = async id => {
		await deleteData(id, cookies, getData)
	}

	return deleteItem
}

export default useDeleteItem
