/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import obtainedPlants from './obtained-plant-list.json'
import SmallCircle from './components/small-circle'
import LargeCircle from './components/large-circle'
import ChevronLeft from './components/chevron-left'
import ChevronRight from './components/chevron-right'

export default function PlantSelect({ setSelectedPlant }) {
	const [currentIndex, setCurrentIndex] = useState(
		() => JSON.parse(localStorage.getItem('selectedPlantIndex')) || 0,
	)

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % obtainedPlants.length)
	}

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? obtainedPlants.length - 1 : prevIndex - 1,
		)
	}

	const handleSelect = (index) => {
		setCurrentIndex(index)
	}

	useEffect(() => {
		localStorage.setItem('selectedPlantIndex', JSON.stringify(currentIndex))
		setSelectedPlant(obtainedPlants[currentIndex])
	}, [currentIndex, setSelectedPlant])

	return (
		<div className="relative flex h-[9.5rem] w-[41.75rem] items-center justify-center rounded-[2rem] bg-green-darkest p-5 align-middle opacity-[0.98]">
			{/* Chevron to go left */}
			<div
				className="absolute left-[-0.8rem] cursor-pointer"
				onClick={handlePrev}
			>
				<ChevronLeft />
			</div>

			{/* Carousel Container */}
			<div className="flex flex-1 justify-center scroll-smooth">
				<div className="flex space-x-4">
					{obtainedPlants.map((plant, index) => (
						<motion.div
							key={index}
							initial={{ scale: index === currentIndex ? 1.2 : 1 }}
							animate={{ scale: index === currentIndex ? 1.2 : 1 }}
							className="relative flex cursor-pointer flex-col items-center justify-center"
							onClick={() => handleSelect(index)}
						>
							{index === currentIndex ? <LargeCircle /> : <SmallCircle />}
							<img
								src={plant.image}
								alt={plant.name}
								className={`absolute ${
									index === currentIndex ? 'h-24 w-24' : 'h-12 w-12'
								}`}
							/>
						</motion.div>
					))}
				</div>
			</div>

			{/* Chevron to go right */}
			<div
				className="absolute right-[-0.8rem] cursor-pointer"
				onClick={handleNext}
			>
				<ChevronRight />
			</div>
		</div>
	)
}
/* eslint-enable */
