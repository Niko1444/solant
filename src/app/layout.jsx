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
			<body>
				<div className="background-div absolute inset-0 bg-cover bg-center">
					{children}
				</div>
			</body>
		</html>
	)
}
