import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import DateRange from './date-range'
import Achievement from './achievement'
import PlantMain from './plant-main'
import PlantSelect from './plant-select'
import obtainedPlants from './obtained-plant-list.json'

function ModalPlant({ openPlant }) {
	const [selectedPlant, setSelectedPlant] = useState(null)

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1224px)',
	})

	useEffect(() => {
		if (!selectedPlant && obtainedPlants.length > 0) {
			const defaultIndex =
				JSON.parse(localStorage.getItem('selectedPlantIndex')) || 0
			setSelectedPlant(obtainedPlants[defaultIndex])
		}
	}, [selectedPlant])

	return (
		<AnimatePresence>
			{openPlant && (
				<>
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className="absolute flex flex-col items-center justify-center gap-[1.5rem]"
						style={{
							transform: 'translate(-50%,-50%)',
						}}
					>
						{/* The top modal */}
						<div
							className={`flex ${
								isDesktopOrLaptop
									? 'h-[43.125rem] w-[81.25rem] flex-col'
									: 'h-full w-full'
							} rounded-[2rem] bg-green-darkest p-5 opacity-[0.98]`}
						>
							{isDesktopOrLaptop ? (
								<>
									<DateRange />
									<PlantMain selectedPlant={selectedPlant} />
									<Achievement />
								</>
							) : (
								<PlantMain selectedPlant={selectedPlant} />
							)}
						</div>
						{/* The bottom modal */}
						{isDesktopOrLaptop && (
							<PlantSelect setSelectedPlant={setSelectedPlant} />
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default React.memo(ModalPlant)
