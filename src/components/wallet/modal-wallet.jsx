import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import CandyMint from '../../components/ui/candyMint'

function ModalWallet({ openWallet, setOpenWallet }) {
	return (
		<AnimatePresence>
			{openWallet && (
				<motion.div
					className="absolute left-[-17rem] top-[-14rem] flex h-[20rem] w-[16rem] flex-col rounded-[2rem] bg-green-darkest p-5 opacity-[0.98]"
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
				>
					<div>
						<div className="flex items-center justify-between font-primary text-green-lightest">
							<h1 className="font-bold uppercase tracking-wider">
								Connect Wallet
							</h1>
							<FiX
								className="cursor-pointer text-2xl"
								onClick={() => setOpenWallet(false)}
							/>
						</div>
						<div className="mb-5 mt-2 h-1 w-full bg-green-lightest"></div>
					</div>
					<div className="flex flex-col items-center align-middle">
						<WalletMultiButton />
						<CandyMint />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default React.memo(ModalWallet)
