'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import CandyMint from '@/components/ui/candyMint'

export default function Footer() {
	const [showWallet, setShowWallet] = useState(false)

	const toggleShowWallet = () => {
		setShowWallet(!showWallet)
	}

	return (
		<>
			{/* The footer will have 2 buttons (left & right), one for open the garden overlay, one for the wallet connecting */}
			{showWallet && <WalletMultiButton />}
			<footer className="flex items-center justify-between text-white">
				{/* The left button */}
				<Image
					src="/assets/svgs/plant-button.svg"
					alt="A button has a plant image inside"
					width={100}
					height={100}
					className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 sm:h-[200px] sm:w-[200px]"
				/>

				{/* The right button */}
				<Image
					src="/assets/svgs/wallet-button.svg"
					alt="A button has a wallet image inside"
					width={100}
					height={100}
					onClick={toggleShowWallet}
					className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 sm:h-[200px] sm:w-[200px]"
				/>
			</footer>
		</>
	)
}
