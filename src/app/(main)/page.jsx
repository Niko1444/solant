'use client'

import Header from '../../components/ui/header'
import Footer from '../../components/ui/footer'
import Pomodoro from '../../components/ui/pomodoro'
import CandyMint from '../../components/ui/candyMint'

export default function Home() {
	return (
		<>
			{/* The site will be in a full width and height layout, with fixed Header and Footer */}
			<div className="background-div absolute inset-0 flex h-full w-full flex-col justify-between bg-cover bg-center">
				<Header />
				<Pomodoro />
				<CandyMint />
				<Footer />
			</div>
		</>
	)
}
