import React from 'react'
import { FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

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

	const isMobile = useMediaQuery({ maxWidth: 767 })

	return (
		<AnimatePresence>
			{openSetting && (
				<>
					<motion.div
						className={`absolute flex flex-col rounded-[2rem] bg-green-darkest p-5 opacity-[0.98] ${
							isMobile ? 'h-[30rem] w-[20rem]' : 'h-[40rem] w-[34rem]'
						}`}
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.8 }}
						style={{
							transform: 'translate(-50%,-50%)',
						}}
					>
						{/* Pomo setting */}
						<div>
							<div className="flex items-center justify-between text-green-lightest">
								<h1 className="font-bold uppercase tracking-wider">
									Pomodoro setting
								</h1>
								<FiX
									className="cursor-pointer text-2xl"
									onClick={() => setOpenSetting(false)}
								/>
							</div>
							<div className="mb-5 mt-2 h-1 w-full bg-green-lightest"></div>
							<div className="flex gap-5">
								{inputs.map((input, index) => (
									<div key={index} className="flex-grow">
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
								))}
							</div>
						</div>
						<div className="flex-grow">
							{/* Huddle */}
							<div className="flex items-center justify-between pt-8 text-green-lightest">
								<h1 className="font-bold uppercase tracking-wider">
									Pomodoro Huddle
								</h1>
							</div>
							<div className="mb-5 mt-2 h-1 w-full bg-green-lightest"></div>
							<div className="flex flex-col gap-4">
								<input
									type="text"
									className="flex-grow rounded bg-green-lightest bg-opacity-30 py-2 text-center text-xl text-white outline-none placeholder:opacity-30"
									placeholder="#HuddleID"
								/>
								<div className="flex gap-2">
									<button className="w-1/2 rounded bg-green-lightest py-2 text-sm text-black transition ease-in-out hover:bg-green-dark hover:text-white">
										Join Huddle
									</button>
									<button className="w-1/2 rounded bg-green-lightest py-2 text-sm text-black transition ease-in-out hover:bg-green-dark hover:text-white">
										Create Huddle
									</button>
								</div>
							</div>
						</div>
						{/* An svg and encourage text */}
						<div className="flex-grow">
							{/* Placeholder for the svg */}
							{/* Encourage text */}
							{!isMobile && (
								<div className="flex h-24 w-full items-center justify-center rounded bg-green-lightest bg-opacity-30">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="48"
										height="48"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-green-lightest"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="12" y1="16" x2="12" y2="12"></line>
										<line x1="12" y1="8" x2="12" y2="8"></line>
									</svg>
								</div>
							)}
							<p className="mt-5 text-center text-green-lightest">
								Huddle up with friends for fun, focus, and exclusive solantrees!
							</p>
						</div>
						{/* Save button */}
						<div>
							<button
								className="mb-6 mt-5 w-full rounded bg-green-lightest py-2 font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white"
								onClick={updateTimeDefaultValue}
							>
								Save
							</button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default React.memo(ModalSetting)
