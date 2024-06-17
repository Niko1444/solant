'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import ModalWallet from '../wallet/modal-wallet'
import ModalPlant from '../plant/modal-plant'

export default function Footer() {
	const [showWalletModal, setShowWalletModal] = useState(false)
	const [showPlantModal, setShowPlantModal] = useState(false)

	const toggleShowWallet = () => {
		setShowWalletModal(!showWalletModal)
	}

	const toggleShowPlant = () => {
		setShowPlantModal(!showPlantModal)
	}

	return (
		<>
			{/* Modal Plant */}
			{showPlantModal && (
				<div className="absolute z-[0] flex h-full w-full items-center justify-center align-middle font-primary">
					<ModalPlant
						openPlant={showPlantModal}
						setOpenPlant={setShowPlantModal}
					/>
				</div>
			)}
			{/* The footer will have 2 buttons (left & right), one for open the garden overlay, one for the wallet connecting */}
			<footer className="flex items-center justify-between text-white">
				{/* The left button */}
				<div className="relative flex h-[100px] w-[100px] items-center justify-center sm:h-[200px] sm:w-[200px]">
					<div className="absolute flex h-full w-full transform cursor-pointer items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110">
						<Image
							src="/assets/svgs/plant-button.svg"
							alt="A button has a plant image inside"
							layout="fill"
							objectFit="contain"
							onClick={toggleShowPlant}
						/>
					</div>
				</div>

				{/* The right button */}
				<div className="relative flex h-[100px] w-[100px] items-center justify-center sm:h-[200px] sm:w-[200px]">
					<div className="absolute flex h-full w-full transform cursor-pointer items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110">
						<Image
							src="/assets/svgs/wallet-button.svg"
							alt="A button has a wallet image inside"
							layout="fill"
							objectFit="contain"
							onClick={toggleShowWallet}
						/>
					</div>
					{/* Wallet Modal */}
					<ModalWallet
						openWallet={showWalletModal}
						setOpenWallet={setShowWalletModal}
					/>
				</div>
			</footer>
		</>
	)
}
