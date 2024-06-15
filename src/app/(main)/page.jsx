'use client'

import Head from 'next/head'
import Header from '../../components/ui/header'
import Footer from '../../components/ui/footer'
import Pomodoro from '../../components/ui/pomodoro'
import CandyMint from '../../components/ui/candyMint'

export default function Home() {
	return (
		<>
			<Head>
				<title>Home - Solant</title>
				<meta
					name="description"
					content="Welcome to Solant, the productive app for studying and working."
				/>
			</Head>
			<div className="background-div absolute inset-0 flex h-full w-full flex-col justify-between bg-cover bg-center">
				<Header />
				<Pomodoro />
				<CandyMint />
				<Footer />
			</div>
		</>
	)
}
