import { useCookies } from 'react-cookie'

const useDeleteItem = getData => {
	const [cookies] = useCookies(['AuthToken'])

	const deleteItem = async id => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_REACT_APP_SERVERURL}/todos/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${cookies.AuthToken}`,
					},
				}
			)
			if (response.status === 200) {
				getData()
			}
		} catch (err) {
			console.error(err)
		}
	}

	return deleteItem
}

export default useDeleteItem
