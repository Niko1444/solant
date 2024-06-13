import './globals.css'
import '@fontsource/inika'
import '@fontsource-variable/yrsa'

export const metadata = {
	title: 'Solant',
	description: 'The productive app for studying and working',
}
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
			</head>
			<body>{children}</body>
		</html>
	)
}
