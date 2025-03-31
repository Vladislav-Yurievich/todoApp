import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { fetchUsers } from '../api/userApi'

const useFetchUsers = () => {
	const [cookies] = useCookies(['AuthToken'])
	const [users, setUsers] = useState([])

	useEffect(() => {
		const getUsers = async () => {
			const usersData = await fetchUsers(cookies.AuthToken)
			setUsers(usersData)
		}

		getUsers()
	}, [cookies.AuthToken])

	return users
}

export default useFetchUsers
