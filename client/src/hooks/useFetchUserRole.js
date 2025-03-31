import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { fetchUserRole } from '../api/userApi'

const useFetchUserRole = () => {
	const [cookies] = useCookies(['AuthToken'])
	const [userRole, setUserRole] = useState('')

	useEffect(() => {
		const getUserRole = async () => {
			const role = await fetchUserRole(cookies.AuthToken)
			setUserRole(role)
		}

		getUserRole()
	}, [cookies.AuthToken])

	return userRole
}

export default useFetchUserRole
