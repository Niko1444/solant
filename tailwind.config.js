/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				green: {
					darkest: '#142C14',
					dark: '#2D5128',
					DEFAULT: '#537B2F',
					light: '#8DA750',
					lightest: '#E4EC9C',
				},
			},
			backgroundImage: {},
			fontFamily: {
				primary: 'Inika, sans-serif',
				secondary: 'Yrsa Variable, serif',
			},
			fontWeight: {
				light: 300,
				normal: 400,
				bold: 700,
			},
		},
	},
	plugins: [],
}
