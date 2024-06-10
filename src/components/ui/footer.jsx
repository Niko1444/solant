import Image from 'next/image'

export default function Footer() {
	return (
		<>
			{/* The footer will have 2 buttons (left & right), one for open the garden overlay, one for the wallet connecting */}
			<footer className="flex items-center justify-between text-white">
				{/* The left button */}
				<Image
					src="/assets/svgs/plant-button.svg"
					alt="A button has a wallet image inside"
					width={200}
					height={200}
					className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
				/>

				{/* The right button */}
				<Image
					src="/assets/svgs/wallet-button.svg"
					alt="A button has a wallet image inside"
					width={200}
					height={200}
					className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
				/>
			</footer>
		</>
	)
}
