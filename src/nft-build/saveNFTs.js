// pages/api/saveNFTs.js

import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
	if (req.method === 'POST') {
		const nftData = req.body
		const filePath = path.join(process.cwd(), 'data', 'nftData.json')

		// Ensure the data directory exists
		fs.mkdirSync(path.dirname(filePath), { recursive: true })

		// Write the data to a JSON file
		fs.writeFileSync(filePath, JSON.stringify(nftData, null, 2))

		res.status(200).json({ message: 'NFT data saved successfully' })
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}
}
