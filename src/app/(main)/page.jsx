import Header from '../../components/ui/header'
import Footer from '../../components/ui/footer'
import Pomodoro from '../../components/ui/pomodoro'

export default function Home() {
	return (
		<>
			{/* The site will be in a full width and height layout, with fixed Header and Footer */}
			<div className="relative flex h-full w-full flex-col justify-between">
				<Header />
				<Pomodoro />
				<Footer />
			</div>
		</>
	)
}
