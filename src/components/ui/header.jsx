import Image from 'next/image'

export default function Header() {

	return (
		<header className="mx-auto flex w-[95%] items-center justify-between pt-4 text-white">
			{/* Logo and sub-text below */}
			<Image src="/assets/svgs/logo.svg" alt="Logo" width={203} height={69} />


			{/* A welcome text */}
			<h1 className="font-primary text-[1.25rem]">
				Greetings Nikola <br />
				Have a productive day!
			</h1>
		</header>
	)
}
