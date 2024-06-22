/* eslint-disable @next/next/no-img-element */
import React from 'react'
import assetMapping from './asset-mapping.json'
import PlantDescription from './plant-descriptions'
import UserStats from './user-stats'
import Land from './components/land'

function PlantMain({ selectedPlant }) {
	if (!selectedPlant) return null

	const { name, symbol, description, attributes } = selectedPlant
	const { type, origin } = attributes

	const typeAsset = assetMapping.types[type]
	const originAsset = assetMapping.origins[origin]

	const stats = [
		{ label: 'You have planted:', value: 5, unit: 'Solantrees' },
		{ label: 'Minted:', value: 3, unit: 'Solantrees' },
		{ label: 'Time of productivity', value: 180, unit: 'minutes' },
		{ label: 'Total streak:', value: 5, unit: 'days' },
	]

	return (
		<div className="flex flex-grow flex-row gap-4">
			<div className="ml-8 flex flex-1 flex-col">
				<PlantDescription
					name={name}
					symbol={symbol}
					typeAsset={typeAsset}
					originAsset={originAsset}
					description={description}
					type={type}
					origin={origin}
				/>

				<div className="my-4 border-b-2 border-green-lightest" />
				<UserStats stats={stats} />
			</div>
			<div className="flex flex-1 items-center justify-center align-middle">
				<Land selectedPlant={selectedPlant} />
			</div>
		</div>
	)
}

export default PlantMain
