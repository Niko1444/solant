import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
	const filePath = path.join(process.cwd(), 'src/data', 'nftData.json')
	if (fs.existsSync(filePath)) {
		const nftData = fs.readFileSync(filePath, 'utf-8')
		return NextResponse.json(JSON.parse(nftData))
	} else {
		return NextResponse.json({ message: 'NFT data not found' }, { status: 404 })
	}
}
