/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js',
	],
	theme: {
		container: {
			center: true,
			padding: '8rem',
		},
		extend: {},
	},
	plugins: [require('flowbite/plugin')],
}
