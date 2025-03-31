export const fetchUsers = async authToken => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_SERVERURL}/users`,
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		)
		if (response.ok) {
			return await response.json()
		}
		return []
	} catch (err) {
		console.error(err)
		return []
	}
}

export const fetchUserRole = async authToken => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_SERVERURL}/user-role`,
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		)
		if (response.ok) {
			const roleData = await response.json()
			return roleData.name
		}
		return ''
	} catch (err) {
		console.error(err)
		return ''
	}
}
