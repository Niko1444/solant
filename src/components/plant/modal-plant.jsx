import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DateRange from './date-range'
import Achievement from './achievement'
import PlantMain from './plant-main'
import PlantSelect from './plant-select'
import obtainedPlants from './obtained-plant-list.json'

function ModalPlant({ openPlant }) {
	const [selectedPlant, setSelectedPlant] = useState(null)

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
						className="absolute flex flex-col items-center justify-center gap-[1.5rem]"
						style={{
							transform: 'translate(-50%,-50%)',
						}}
					>
						{/* The top modal */}
						<div className="flex h-[43.125rem] w-[81.25rem] flex-col rounded-[2rem] bg-green-darkest p-5 opacity-[0.98]">
							<DateRange />
							<PlantMain selectedPlant={selectedPlant} />
							<Achievement />
						</div>
						{/* The bottom modal */}
						<PlantSelect setSelectedPlant={setSelectedPlant} />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default React.memo(ModalPlant)
