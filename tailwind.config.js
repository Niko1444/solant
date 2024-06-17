/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			animation: {
				glow: 'glow 1.5s infinite',
				'spin-fast': 'spin 0.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
				'spin-once': 'spinOnce 0.5s ease-in-out',
			},
			keyframes: {
				glow: {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))',
					},
					'50%': {
						filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 1))',
					},
				},
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				spinOnce: {
					'0%': { transform: 'rotate(0deg)', easing: 'ease-in' },
					'50%': { transform: 'rotate(180deg)', easing: 'ease-out' },
					'100%': { transform: 'rotate(360deg)', easing: 'ease-in' },
				},
			},
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
