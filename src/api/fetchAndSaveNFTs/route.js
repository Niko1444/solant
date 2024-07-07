import { NextResponse } from 'next/server'
import { Connection, PublicKey } from '@solana/web3.js'
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import fs from 'fs'
import path from 'path'

const rpcEndpoint = 'https://api.devnet.solana.com'
const solanaConnection = new Connection(rpcEndpoint)
const walletToQuery = 'H6oEWNDbXCCXXwjZG4XViVTdctoXubnGa1LDQ76vWNk5'
const metaplex = Metaplex.make(solanaConnection).use(
	keypairIdentity(walletToQuery),
)

export async function POST(req) {
	try {
		const filters = [
			{
				dataSize: 165,
			},
			{
				memcmp: {
					offset: 32,
					bytes: walletToQuery,
				},
			},
		]
		const accounts = await solanaConnection.getParsedProgramAccounts(
			TOKEN_PROGRAM_ID,
			{ filters },
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

		const filePath = path.join(process.cwd(), 'src/data', 'nftData.json')
		fs.mkdirSync(path.dirname(filePath), { recursive: true })
		fs.writeFileSync(filePath, JSON.stringify(nftData, null, 2))

		return NextResponse.json({
			message: 'NFT data saved successfully',
			data: nftData,
		})
	} catch (error) {
		console.error('Error fetching NFT data:', error)
		return NextResponse.json(
			{ message: 'Error fetching NFT data' },
			{ status: 500 },
		)
	}
}
