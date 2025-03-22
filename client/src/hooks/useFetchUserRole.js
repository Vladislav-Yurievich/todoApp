import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const useFetchUserRole = () => {
	const [cookies] = useCookies(['AuthToken'])
	const [userRole, setUserRole] = useState('')

	useEffect(() => {
		const fetchUserRole = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_REACT_APP_SERVERURL}/user-role`,
					{
						headers: {
							Authorization: `Bearer ${cookies.AuthToken}`,
						},
					}
				)
				if (response.ok) {
					const roleData = await response.json()
					setUserRole(roleData.name)
				}
			} catch (err) {
				console.error(err)
			}
		}

		fetchUserRole()
	}, [cookies.AuthToken])

	return userRole
}

export default useFetchUserRole
