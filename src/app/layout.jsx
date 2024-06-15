'use client'

import './globals.css'
import '@fontsource/inika'
import '@fontsource-variable/yrsa'

// Comment out the server-side metadata as it's temporarily disabled
// export const metadata = {
// 	title: 'Solant',
// 	description: 'The productive app for studying and working',
// }

import { useEffect, useMemo, useState } from 'react'
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import '@solana/wallet-adapter-react-ui/styles.css'

export default function RootLayout({ children }) {
	const [mounted, setMounted] = useState(false)

	const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		// <html lang="en">
		// 	<head>
		// 		<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
		// 	</head>
		// 	<body>{children}</body>
		// </html>
		mounted && (
			<ConnectionProvider
				endpoint="https://solana-devnet.g.alchemy.com/v2/Yw6g1yw54yXlyLYD5kXbxH4-8tAxvVGY"
				config={{ commitment: 'confirmed' }}
			>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>{children}</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		)
	)
}
