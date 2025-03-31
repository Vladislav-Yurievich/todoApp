export const postData = async (data, cookies, setShowModal, getData) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_SERVERURL}/todos`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.AuthToken}`,
				},
				body: JSON.stringify({
					...data,
					assigneeId: data.assignee,
				}),
			}
		)
		if (response.status === 200) {
			setShowModal(false)
			getData()
		} else {
			console.error('Failed to post data', response.statusText)
		}
	} catch (err) {
		console.error(err)
	}
}

export const editData = async (data, task, cookies, setShowModal, getData) => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_SERVERURL}/todos/${task.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.AuthToken}`,
				},
				body: JSON.stringify({
					...data,
					user_id: data.assignee,
				}),
			}
		)
		if (response.status === 200) {
			setShowModal(false)
			getData()
		} else {
			console.error('Failed to edit data', response.statusText)
		}
	} catch (err) {
		console.error(err)
	}
}

export const deleteData = async (id, cookies, getData) => {
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
		} else {
			console.error('Failed to delete data', response.statusText)
		}
	} catch (err) {
		console.error(err)
	}
}
