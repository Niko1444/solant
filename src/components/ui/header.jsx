import Image from 'next/image'

export default function Header() {
	return (
		<header className="mx-auto flex w-[95%] flex-col items-center justify-between pt-4 text-white sm:flex-row">
			{/* Logo */}
			<Image
				src="/assets/svgs/logo.svg"
				alt="Logo"
				width={203}
				height={69}
				className="mb-4 sm:mb-0"
			/>

			{/* A welcome text */}
			<h1 className="text-right font-primary text-[1rem] sm:text-[1.25rem]">
				Greetings,
				<br />
				Have a productive day!
			</h1>
		</header>
	)
}
