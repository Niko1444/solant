import React from 'react'
import useUserSOLBalanceStore from './useUserSOLBalanceStore'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { publicKey } from '@metaplex-foundation/umi'

const MyComponent = () => {
	const { balance, getUserSOLBalance } = useUserSOLBalanceStore()
	const connection = useConnection()

	React.useEffect(() => {
		// Replace these with actual values
		const publicKey = new PublicKey(
			'HEek8XQaGRoPWCtM2TTgguENtiuxdsNyFjFYKLyHSUso',
		)

		getUserSOLBalance(publicKey, connection)
	}, [])

	return (
		<div>
			<h1>Your SOL Balance</h1>
			<p>{balance}</p>
		</div>
	)
}

export default MyComponent
