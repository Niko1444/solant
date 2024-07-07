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

		const nftData = await Promise.all(
			accounts.map(async (account) => {
				const parsedAccountInfo = account.account.data
				const mintAddress = new PublicKey(
					parsedAccountInfo['parsed']['info']['mint'],
				)
				const tokenBalance =
					parsedAccountInfo['parsed']['info']['tokenAmount']['uiAmount']

				const nft = await metaplex.nfts().findByMint({ mintAddress })
				return {
					tokenAccount: account.pubkey.toString(),
					tokenMint: mintAddress.toString(),
					tokenBalance,
					name: nft.json.name,
					symbol: nft.json.symbol,
					description: nft.json.description,
					image: nft.json.image,
					attributes: nft.json.attributes,
				}
			}),
		)

		return nftData
	} catch (error) {
		console.error('Error fetching token accounts:', error)
		return []
	}
}
