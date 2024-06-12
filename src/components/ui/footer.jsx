'use client';

import React, { useState } from 'react';

import Image from 'next/image'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import { mint } from '@/app/(main)/page';

export default function Footer({ candyState, metaplex }) {

    const [showWallet, setShowWallet] = useState(false);

    const handleClick = () => {
        setShowWallet(true);
    };

	const handleMint = async () => {
		try {
		  await mint(candyState, metaplex)
		} catch (error) {
		  console.error(error)
		}
	  }

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
					onClick={handleMint}
				/>
				


                {showWallet && <WalletMultiButton />}

				{/* The right button */}
                <Image
                    src="/assets/svgs/wallet-button.svg"
                    alt="A button has a wallet image inside"
                    width={200}
                    height={200}
                    className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                    onClick={handleClick}
                />
			</footer>
		</>
	)
}
