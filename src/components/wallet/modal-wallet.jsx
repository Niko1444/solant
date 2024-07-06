import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { getTokenAccounts } from '../../nft-build/QueryNFT'
import { Connection } from '@solana/web3.js'
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js'
import CandyMint from '../../components/ui/candyMint'

const rpcEndpoint = 'https://api.devnet.solana.com'
const solanaConnection = new Connection(rpcEndpoint)

function ModalWallet({ openWallet, setOpenWallet }) {
	const { publicKey, connect, disconnect } = useWallet()
	const [walletAddress, setWalletAddress] = useState(null)
	const [metaplex, setMetaplex] = useState(null)

	useEffect(() => {
		if (publicKey) {
			const address = publicKey.toString()
			setWalletAddress(address)

			// Initialize Metaplex with the wallet's public key
			const metaplexInstance = Metaplex.make(solanaConnection).use(
				keypairIdentity(publicKey),
			)
			setMetaplex(metaplexInstance)

			console.log('Connected wallet address:', address)
		} else {
			setWalletAddress(null)
			setMetaplex(null)
		}
	}, [publicKey])

	useEffect(() => {
		if (walletAddress && metaplex) {
			getTokenAccounts(walletAddress, solanaConnection, metaplex)
		}
	}, [walletAddress, metaplex])

	return (
		<AnimatePresence>
			{openWallet && (
				<motion.div
					className="absolute left-[-17rem] top-[-18rem] flex h-[20rem] w-[16rem] flex-col rounded-[2rem] bg-green-darkest p-5 opacity-[0.98] md:left-[-17rem] md:top-[-14rem]"
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
					transition={{ duration: 0.2 }}
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
