'use client';

import Header from '../../components/ui/header'
import Footer from '../../components/ui/footer'
import Pomodoro from '../../components/ui/pomodoro'

import { useEffect, useMemo, useState } from 'react'

import {
	guestIdentity,
	Metaplex,
	walletAdapterIdentity,
} from '@metaplex-foundation/js'

import { LAMPORTS_PER_SOL } from '@solana/web3.js'

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'

import { PublicKey } from '@solana/web3.js'

const CANDY_MACHINE_PROGRAM_ID = new PublicKey(
	'CU4A14G8wVGiT6czXmVNAQsieRBcXTWbHFC2MFpUUqxp',
)

export const mint = async (candyState, metaplex) => {
    if (!metaplex) return

    try {
        const mintResult = await metaplex.candyMachines().mint({
            candyMachine: {
                address: CANDY_MACHINE_PROGRAM_ID,
                collectionMintAddress : candyState.collectionMintAddress,
                candyGuard : "F6knqp1cy8jm8areAtcGDmL4SGd126dLi9mXKnhCAsvs",
            },
            collectionUpdateAuthority: candyState.authorityAddress,
            group : null
        })

        console.log(mintResult)

    } catch (error) {
        throw error
    }
}



export default function Home() {

	const [metaplex, setMetaplex] = useState()

	const [candyState, setCandyState] = useState()

	const [candyStateError, setCandyStateError] = useState()

	const [candyStateLoading, setCandyStateLoading] = useState(true)

	const [txError, setTxError] = useState()

	const [txLoading, setTxLoading] = useState(false)

	const [nfts, setNfts] = useState([])

	const { connection } = useConnection()

	const wallet = useAnchorWallet()

	useEffect(() => {
		setMetaplex(
			Metaplex.make(connection).use(
				wallet ? walletAdapterIdentity(wallet) : guestIdentity(),
			)
		)
	}, [connection, wallet])

	// Set up state and update candy machine every few seconds
	useEffect(() => {
		if (!metaplex) return
	
		const updateState = async () => {
			try {
				const state = await metaplex
					.candyMachines()
					.findByAddress({ address : CANDY_MACHINE_PROGRAM_ID})
	
				setCandyState(state);
				setNfts(state.items);
				setCandyStateError(null);
			} catch (error) {
				console.error(error)
			} finally {
				setCandyStateLoading(false)
			}
		}
	
		updateState();

		const interval = setInterval(() => updateState(), 30_000);

		return () => clearInterval(interval);
	}, [metaplex]) // Added metaplex to the dependency array


	const soldOut = candyState?.itemsRemaining.eqn(0)
	const soldAmount = candyState?.candyGuard?.guards?.solPayment ? 
						candyState.candyGuard.guards.solPayment.lamports.toNumber() / LAMPORTS_PER_SOL : null;

	console.log(candyState)
						

	console.log(candyState?.itemsAvailable?.toString(), candyState?.itemsRemaining?.toString())

	return (
		<>

			{/* The site will be in a full width and height layout, with fixed Header and Footer */}
			<div className="relative flex h-full w-full flex-col justify-between">
				<Header />
				<Pomodoro />
				<Footer candyState={candyState} metaplex={metaplex} />
			</div>

		</>

	)


}
