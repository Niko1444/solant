import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useMemo } from 'react'
// import useUserSOLBalanceStore from '../../nft-build/useUserSOLBalanceStore';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
	generateSigner,
	transactionBuilder,
	publicKey,
	some,
} from '@metaplex-foundation/umi'
import {
	fetchCandyMachine,
	mintV2,
	mplCandyMachine,
	safeFetchCandyGuard,
} from '@metaplex-foundation/mpl-candy-machine'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox'
import { clusterApiUrl } from '@solana/web3.js'
import * as bs58 from 'bs58'

const quicknodeEndpoint =
	'https://solana-devnet.g.alchemy.com/v2/Yw6g1yw54yXlyLYD5kXbxH4-8tAxvVGY ' ||
	clusterApiUrl('devnet')
const candyMachineAddress = publicKey(
	'3USi3CnQyMHHEYjmvAqdbX9NZsEwJzfE39RQHPZjxtNK',
)
const treasury = publicKey('H6oEWNDbXCCXXwjZG4XViVTdctoXubnGa1LDQ76vWNk5')

export default function CandyMint() {
	const { connection } = useConnection()
	const wallet = useWallet()
	// const { getUserSOLBalance } = useUserSOLBalanceStore();

	const umi = useMemo(
		() =>
			createUmi(quicknodeEndpoint)
				.use(walletAdapterIdentity(wallet))
				.use(mplCandyMachine())
				.use(mplTokenMetadata()),
		[wallet],
	)

	const onClick = useCallback(async () => {
		if (!wallet.publicKey) {
			console.log('error', 'Wallet not connected!')
			return
		}

		const candyMachine = await fetchCandyMachine(umi, candyMachineAddress)
		const candyGuard = await safeFetchCandyGuard(
			umi,
			candyMachine.mintAuthority,
		)
		try {
			const nftMint = generateSigner(umi)
			const transaction = transactionBuilder()
				.add(setComputeUnitLimit(umi, { units: 800_000 }))
				.add(
					mintV2(umi, {
						candyMachine: candyMachine.publicKey,
						candyGuard: candyGuard?.publicKey,
						nftMint,
						collectionMint: candyMachine.collectionMint,
						collectionUpdateAuthority: candyMachine.authority,
						mintArgs: {
							solPayment: some({ destination: treasury }),
						},
					}),
				)
			const { signature } = await transaction.sendAndConfirm(umi, {
				confirm: { commitment: 'confirmed' },
			})
			const txid = bs58.encode(signature)
			console.log('success', `Mint successful! ${txid}`)

			// getUserSOLBalance(wallet.publicKey, connection);
		} catch (error) {
			console.log('error', `Mint failed! ${error?.message}`)
		}
		// }, [wallet, connection, getUserSOLBalance, umi, candyMachineAddress, treasury]);
	}, [wallet, umi])

	return (
		<button
			className="mb-6 mt-5 h-11 w-[78%] rounded bg-green-lightest font-primary font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white"
			onClick={onClick}
		>
			<span>Mint NFT </span>
		</button>
	)
}
