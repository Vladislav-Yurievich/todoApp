import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { BrowserRouter, Routes, Route } from 'react-router'
// import Auth from './pages/Auth.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* <BrowserRouter> */}
		{/* <Routes> */}
		<App />
		{/* </Routes> */}
		{/* </BrowserRouter> */}
	</StrictMode>
)
