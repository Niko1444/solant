import React from 'react'
import { FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function ModalSetting({
	pomodoroRef,
	shortBreakRef,
	longBreakRef,
	openSetting,
	setOpenSetting,
	updateTimeDefaultValue,
}) {
	const inputs = [
		{
			value: 'Pomodoro',
			ref: pomodoroRef,
			defaultValue: 25,
		},
		{
			value: 'Short Break',
			ref: shortBreakRef,
			defaultValue: 5,
		},
		{
			value: 'Long Break',
			ref: longBreakRef,
			defaultValue: 10,
		},
	]

	return (
		<AnimatePresence>
			{openSetting && (
				<>
					{/* Dim is disabled */}
					{/* <motion.div
						className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-30"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpenSetting(false)}
					/> */}
					<motion.div
						className="absolute w-96 rounded-[2rem] bg-green-darkest p-5 opacity-[0.98]"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						style={{
							transform: 'translate(-50%,-50%)',
						}}
					>
						<div className="flex items-center justify-between text-green-lightest">
							<h1 className="font-bold uppercase tracking-wider">
								Pomodoro setting
							</h1>
							<FiX
								className="cursor-pointer text-2xl"
								onClick={() => setOpenSetting(false)}
							/>
						</div>
						<div className="mb-5 mt-5 h-1 w-full bg-green-lightest"></div>
						<div className="flex gap-5">
							{inputs.map((input, index) => {
								return (
									<div key={index}>
										<h1 className="text-sm text-green-lightest">
											{input.value}
										</h1>
										<input
											defaultValue={input.defaultValue}
											type="number"
											className="w-full rounded bg-green-lightest bg-opacity-30 py-2 text-center text-xl text-white outline-none"
											ref={input.ref}
										/>
									</div>
								)
							})}
						</div>
						<button
							className="mt-5 w-full rounded bg-green-lightest py-2 uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white"
							onClick={updateTimeDefaultValue}
						>
							Save
						</button>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default React.memo(ModalSetting)
