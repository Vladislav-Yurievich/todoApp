import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import Header from './components/Header'
import { useEffect, useState, useCallback } from 'react'
import { useCookies } from 'react-cookie'

const App = () => {
	const [cookies] = useCookies(null)
	const authToken = cookies.AuthToken
	const authLogin = cookies.Login

	const [tasks, setTasks] = useState(null)

	const getData = useCallback(async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_REACT_APP_SERVERURL}/todos/${authLogin}`
			)
			const json = await response.json()
			setTasks(json)
		} catch (err) {
			console.error(err)
		}
	}, [authLogin])

	useEffect(() => {
		if (authToken) {
			getData()
		}
	}, [authToken, getData])

	const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

	return (
		<div className='app'>
			{!authToken && <Auth />}
			{authToken && (
				<>
					<Header />
					<div className='container mt-10'>
						<h1 className='text-2xl'>Список задач</h1>
						<ul className='list-none'>
							{sortedTasks?.map(task => (
								<ListItem key={task.id} task={task} getData={getData} />
							))}
						</ul>
						<ListHeader getData={getData} />
					</div>
				</>
			)}
		</div>
	)
}

export default App
