import { useCookies } from 'react-cookie'

const Header = ({ getData }) => {
	const [cookies, setCookie, removeCookie] = useCookies(null)
	const authLogin = cookies.Login

	const signOut = () => {
		console.log('signout')
		removeCookie('Email')
		removeCookie('AuthToken')
		removeCookie('Login')
		window.location.reload()
	}

	return (
		<header className='container min-h-[50px] flex justify-between items-center mt-[20px]'>
			<p className='pr-[20px]'>{authLogin}</p>
			<button className='signout' onClick={signOut}>
				Выйти
			</button>
		</header>
	)
}

export default Header
