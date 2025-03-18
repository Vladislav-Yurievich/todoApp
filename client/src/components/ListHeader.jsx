import Modal from './Modal'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const ListHeader = ({ getData }) => {
	const [cookies] = useCookies(['AuthToken'])
	const [showModal, setShowModal] = useState(false)
	const [userRole, setUserRole] = useState('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchUserRole = async () => {
			if (!cookies.AuthToken) return

			setLoading(true)
			setError(null)
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
				} else {
					setError('Ошибка при получении роли пользователя')
				}
			} catch (err) {
				console.error(err)
				setError('Произошла ошибка при подключении к серверу')
			} finally {
				setLoading(false)
			}
		}
		fetchUserRole()
	}, [cookies.AuthToken])

	if (loading) {
		return <p>Загрузка...</p>
	}

	if (error) {
		return <p className='text-red-500'>{error}</p>
	}

	return (
		<div className='list-header'>
			<div className='button-container'>
				{userRole === 'MANAGER' && (
					<button
						className='relative mt-6 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
						onClick={() => setShowModal(true)}
					>
						<span className='relative text-base px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
							Новая задача
						</span>
					</button>
				)}
			</div>
			{showModal && (
				<Modal mode={'create'} setShowModal={setShowModal} getData={getData} />
			)}
		</div>
	)
}

export default ListHeader
