/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

const gridCells = [
	{ top: '4.5%', left: '50%', zIndex: 10 }, // Row 1
	{ top: '10.5%', left: '41%', zIndex: 15 },
	{ top: '10.5%', left: '59%', zIndex: 15 }, // Row 2
	{ top: '17.3%', left: '31%', zIndex: 20 },
	{ top: '17.3%', left: '50%', zIndex: 20 },
	{ top: '17.3%', left: '68%', zIndex: 20 }, // Row 3
	{ top: '24%', left: '21%', zIndex: 25 },
	{ top: '24%', left: '40%', zIndex: 25 },
	{ top: '24%', left: '59%', zIndex: 25 },
	{ top: '24%', left: '78%', zIndex: 25 }, // Row 4
	{ top: '30.5%', left: '10%', zIndex: 30 },
	{ top: '31%', left: '30%', zIndex: 30 },
	{ top: '31%', left: '49%', zIndex: 30 },
	{ top: '31%', left: '69%', zIndex: 30 },
	{ top: '31%', left: '88%', zIndex: 30 }, // Row 5
	{ top: '38.5%', left: '19%', zIndex: 35 },
	{ top: '38.5%', left: '39%', zIndex: 35 },
	{ top: '38.5%', left: '59%', zIndex: 35 },
	{ top: '38.5%', left: '79%', zIndex: 35 }, // Row 6
	{ top: '46.5%', left: '49%', zIndex: 40 },
	{ top: '46.5%', left: '28%', zIndex: 40 },
	{ top: '46.5%', left: '70%', zIndex: 40 }, // Row 7
	{ top: '54.5%', left: '38%', zIndex: 45 },
	{ top: '54.5%', left: '60%', zIndex: 45 }, // Row 8
	{ top: '64.5%', left: '49%', zIndex: 50 }, // Row 9
]

const getRandomIndices = (num) => {
	const indices = []
	while (indices.length < num) {
		const index = Math.floor(Math.random() * gridCells.length)
		if (!indices.includes(index)) {
			indices.push(index)
		}
	}
	return indices
}

const Land = ({ selectedPlant }) => {
	const [randomCells, setRandomCells] = useState([])

	useEffect(() => {
		const numTrees = 5 // Number of random Solantrees to generate
		const indices = getRandomIndices(numTrees)
		setRandomCells(indices.map((index) => gridCells[index]))
	}, [selectedPlant])

	return (
		<div className="relative z-0 flex items-center justify-center align-middle">
			<img
				src="/assets/svgs/land.svg"
				alt="Land"
				className="relative z-0 h-auto w-full"
			/>
			{/* Solantrees */}
			<div className="absolute mb-[11rem] mr-[4rem] h-full w-full">
				{randomCells.map((cell, index) => (
					<img
						key={index}
						src={selectedPlant.image}
						alt={selectedPlant.name}
						className="absolute w-20"
						style={{ top: cell.top, left: cell.left, zIndex: cell.zIndex }}
					/>
				))}
			</div>
			{/* Shadow */}
			<div className="absolute mb-[1rem] mr-[4rem] h-full w-full">
				{randomCells.map((cell, index) => (
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
								fill-opacity="0.3"
							/>
						</svg>
					</div>
				))}
			</div>
		</div>
	)
}

export default Land
/* eslint-enable @next/next/no-img-element */
