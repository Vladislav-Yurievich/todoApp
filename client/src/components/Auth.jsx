import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Auth = () => {
	const [cookies, setCookie, removeCookie] = useCookies(null)
	const [isLogIn, setIsLogin] = useState(true)
	// const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [login, setLogin] = useState(null)
	const [confirmPassword, setConfirmPassword] = useState(null)
	const [error, setError] = useState(null)
	const [firstName, setFirstName] = useState(null)
	const [lastName, setLastName] = useState(null)
	const [middleName, setMiddleName] = useState(null)

	const viewLogin = status => {
		setError(null)
		setIsLogin(status)
	}

	const handleSubmit = async (e, endpoint) => {
		e.preventDefault()
		if (!isLogIn && password !== confirmPassword) {
			setError('Пароли не совпадают!')
			return
		}

		const bodyData = isLogIn
			? { login, password }
			: { firstName, lastName, middleName, login, password }

		console.log('Sending data:', bodyData)

		const response = await fetch(
			`${import.meta.env.VITE_REACT_APP_SERVERURL}/${endpoint}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(bodyData),
			}
		)

		const data = await response.json()

		if (data.error) {
			setError(data.error)
		} else {
			setCookie('AuthToken', data.token)
			setCookie('Login', data.login)

			window.location.reload()
		}
	}

	return (
		<div className='flex min-h-full flex-col pt-20 px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-3xl/9 font-bold tracking-tight'>
					{isLogIn ? 'Авторизация' : 'Регистрация'}
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form
					className='space-y-6'
					onSubmit={e => handleSubmit(e, isLogIn ? 'login' : 'signup')}
				>
					{!isLogIn && (
						<>
							<div>
								<input
									type='text'
									placeholder='Имя'
									required
									className='text-black block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
									onChange={e => setFirstName(e.target.value)}
								/>
							</div>

							<div>
								<input
									type='text'
									placeholder='Фамилия'
									required
									className='text-black block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
									onChange={e => setLastName(e.target.value)}
								/>
							</div>

							<div>
								<input
									type='text'
									placeholder='Отчество'
									required
									className='text-black block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
									onChange={e => setMiddleName(e.target.value)}
								/>
							</div>
						</>
					)}

					<div>
						<input
							type='text'
							placeholder='Логин'
							required
							className='text-black block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
							onChange={e => setLogin(e.target.value)}
						/>
					</div>

					<div>
						<input
							type='password'
							placeholder='Пароль'
							required
							className='text-black block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					{!isLogIn && (
						<div>
							<input
								type='password'
								placeholder='Повторите пароль'
								required
								className='text-black block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								onChange={e => setConfirmPassword(e.target.value)}
							/>
						</div>
					)}
					<button
						type='submit'
						className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Войти
					</button>
					{error && (
						<p className='text-red-500 font-semibold text-base text-center'>
							{error}
						</p>
					)}
				</form>
				<div className='auth-options text-center mt-4 text-sm '>
					{isLogIn && (
						<p className='text-gray-600'>
							Нет аккаунта?{' '}
							<button
								onClick={() => viewLogin(false)}
								className='text-blue-500 hover:underline focus:outline-none'
							>
								Зарегистрироваться
							</button>
						</p>
					)}
					{!isLogIn && (
						<p className='text-gray-600'>
							Уже есть аккаунт?{' '}
							<button
								onClick={() => viewLogin(true)}
								className='text-blue-500 hover:underline focus:outline-none'
							>
								Авторизация
							</button>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Auth
