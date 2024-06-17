/* eslint-disable @next/next/no-img-element */
import React from 'react'

const PlantDescription = ({
	name,
	symbol,
	typeAsset,
	originAsset,
	description,
	type,
	origin,
}) => (
	<div className="flex flex-[40%] flex-col">
		<div className="flex-[50%]">
			<h2 className="text-[2.5rem] text-white">
				{name} {symbol}
			</h2>
			<div className="flex items-center gap-2">
				{/* Render type SVG */}
				{typeAsset && (
					<img src={typeAsset} alt={type} className="m-0 h-[1.6rem]" />
				)}
				{/* Render origin SVG */}
				{originAsset && (
					<img src={originAsset} alt={origin} className="m-0 h-[1.6rem]" />
				)}
			</div>
		</div>
		<div className="flex-[50%] text-green-lightest">
			<p>"{description}"</p>
		</div>
	</div>
)
/* eslint-enable @next/next/no-img-element */

export default PlantDescription
