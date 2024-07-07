/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

import { Metaplex, keypairIdentity } from '@metaplex-foundation/js'
import { Connection, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

const rpcEndpoint = 'https://api.devnet.solana.com'
const solanaConnection = new Connection(rpcEndpoint)
const walletToQuery = 'EB6nvWNtLnRHXvCsDQdkfW6gxJE79ixqDWVsesVm59YS'

const metaplex = Metaplex.make(solanaConnection).use(
	keypairIdentity(walletToQuery),
)

const gridCells = [
	{ top: '4.5%', left: '50%', zIndex: 10, position: 1 }, // Row 1
	{ top: '10.5%', left: '41%', zIndex: 15, position: 2 },
	{ top: '10.5%', left: '59%', zIndex: 15, position: 3 }, // Row 2
	{ top: '17.3%', left: '31%', zIndex: 20, position: 4 },
	{ top: '17.3%', left: '50%', zIndex: 20, position: 5 },
	{ top: '17.3%', left: '68%', zIndex: 20, position: 6 }, // Row 3
	{ top: '24%', left: '21%', zIndex: 25, position: 7 },
	{ top: '24%', left: '40%', zIndex: 25, position: 8 },
	{ top: '24%', left: '59%', zIndex: 25, position: 9 },
	{ top: '24%', left: '78%', zIndex: 25, position: 10 }, // Row 4
	{ top: '30.5%', left: '10%', zIndex: 30, position: 11 },
	{ top: '31%', left: '30%', zIndex: 30, position: 12 },
	{ top: '31%', left: '49%', zIndex: 30, position: 13 },
	{ top: '31%', left: '69%', zIndex: 30, position: 14 },
	{ top: '31%', left: '88%', zIndex: 30, position: 15 }, // Row 5
	{ top: '38.5%', left: '19%', zIndex: 35, position: 16 },
	{ top: '38.5%', left: '39%', zIndex: 35, position: 17 },
	{ top: '38.5%', left: '59%', zIndex: 35, position: 18 },
	{ top: '38.5%', left: '79%', zIndex: 35, position: 19 }, // Row 6
	{ top: '46.5%', left: '49%', zIndex: 40, position: 20 },
	{ top: '46.5%', left: '28%', zIndex: 40, position: 21 },
	{ top: '46.5%', left: '70%', zIndex: 40, position: 22 }, // Row 7
	{ top: '54.5%', left: '38%', zIndex: 45, position: 23 },
	{ top: '54.5%', left: '60%', zIndex: 45, position: 24 }, // Row 8
	{ top: '64.5%', left: '49%', zIndex: 50, position: 25 }, // Row 9
]

const Land = () => {
	const [nftData, setNftData] = useState([])
	const [loading, setLoading] = useState(true)

	console.log(nftData) // an array of NFT data, use this to render NFTs by mapping their attributes with the asset-mapping.json

	useEffect(() => {
		const fetchNftData = async () => {
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
					{ filters: filters },
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

				// Convert the data to JSON format
				setNftData(nftData)
			} catch (error) {
				console.error('Error fetching NFT data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchNftData()
	}, [])

	if (loading) {
		return <div className="font-primary text-green-lightest">Loading...</div>
	}

	const mapNftToCell = () => {
		return gridCells.map((cell) => {
			const nft = nftData.find((nft) => {
				const indexAttr = nft.attributes.find(
					(attr) => attr.trait_type === 'index',
				)
				return indexAttr && parseInt(indexAttr.value) === cell.position
			})

			if (nft) {
				return { ...cell, nft }
			}
			return cell
		})
	}

	const cellsWithNfts = mapNftToCell()

	const sanitizeFileName = (name) => {
		return name.toLowerCase().replace(/ /g, '_')
	}

	return (
		<>
			<div className="relative z-0 flex items-center justify-center align-middle">
				<img
					src="/assets/svgs/land.svg"
					alt="Land"
					className="relative z-0 h-auto w-full"
				/>

				{/* Solantrees */}
				<div className="absolute mb-[11rem] mr-[4rem] h-full w-full">
					{cellsWithNfts.map((cell, index) =>
						cell.nft ? (
							<img
								key={index}
								src={`/assets/solantrees/${sanitizeFileName(cell.nft.name)}.svg`}
								alt={cell.nft.name}
								className="absolute md:w-20"
								style={{ top: cell.top, left: cell.left, zIndex: cell.zIndex }}
							/>
						) : null,
					)}
				</div>

				{/* Shadow */}
				<div className="absolute mb-[1rem] mr-[4rem] h-full w-full">
					{cellsWithNfts.map((cell, index) =>
						cell.nft ? (
							<div
								key={index}
								className="absolute bottom-0 md:w-20"
								style={{ top: cell.top, left: cell.left, zIndex: 1 }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="81"
									height="33"
									viewBox="0 0 81 33"
									fill="none"
								>
									<ellipse
										cx="40.3968"
										cy="16.745"
										rx="39.9271"
										ry="16.0902"
										fill="black"
										fillOpacity="0.3"
									/>
								</svg>
							</div>
						) : null,
					)}
				</div>
			</div>
		</>
	)
}

export default Land
/* eslint-enable @next/next/no-img-element */
