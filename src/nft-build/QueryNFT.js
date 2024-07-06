// utils/getTokenAccounts.js
import { PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export async function getTokenAccounts(wallet, solanaConnection, metaplex) {
	const filters = [
		{
			dataSize: 165, // size of account (bytes)
		},
		{
			memcmp: {
				offset: 32, // location of our query in the account (bytes)
				bytes: wallet, // our search criteria, a base58 encoded string
			},
		},
	]
	try {
		const accounts = await solanaConnection.getParsedProgramAccounts(
			TOKEN_PROGRAM_ID,
			{
				filters: filters,
			},
		)

		console.log(
			`Found ${accounts.length} token account(s) for wallet ${wallet}.`,
		)
		for (const account of accounts) {
			// Parse the account data
			const parsedAccountInfo = account.account.data
			const mintAddress = new PublicKey(
				parsedAccountInfo['parsed']['info']['mint'],
			)
			const tokenBalance =
				parsedAccountInfo['parsed']['info']['tokenAmount']['uiAmount']

			// Log results
			console.log(`Token Account: ${account.pubkey.toString()}`)
			console.log(`--Token Mint: ${mintAddress}`)
			console.log(`--Token Balance: ${tokenBalance}`)

			const nft = await metaplex.nfts().findByMint({ mintAddress })
			console.log(nft.json.name)
			console.log(nft.json.symbol)
			console.log(nft.json.description)
			console.log(nft.json.image)
			console.log(nft.json.attributes)
		}
	} catch (error) {
		console.error(error)
	}
}
