import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const useFetchUsers = () => {
	const [cookies] = useCookies(['AuthToken'])
	const [users, setUsers] = useState([])

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_REACT_APP_SERVERURL}/users`,
					{
						headers: {
							Authorization: `Bearer ${cookies.AuthToken}`,
						},
					}
				)
				if (response.ok) {
					const usersData = await response.json()
					setUsers(usersData)
				}
			} catch (err) {
				console.error(err)
			}
		}

		fetchUsers()
	}, [cookies.AuthToken])

	return users
}

export default useFetchUsers
