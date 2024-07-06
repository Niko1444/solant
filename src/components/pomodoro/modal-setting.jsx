import React, { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { io } from 'socket.io-client'

// Ensure the environment variable is set correctly
// Create the socket connection
const socket = io(
	'https://render-socket-ylqm.onrender.com/' || 'http://localhost:3001',
)

function ModalSetting({
	pomodoroRef,
	shortBreakRef,
	longBreakRef,
	openSetting,
	setOpenSetting,
	updateTimeDefaultValue,
	setCurrentRoom,
}) {
	const [roomID, setRoomID] = useState('')
	const [inHuddle, setInHuddle] = useState(false)

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

	// Retrieve huddle state from local storage on mount
	useEffect(() => {
		const savedRoomID = localStorage.getItem('roomID')
		const savedInHuddle = localStorage.getItem('inHuddle') === 'true'

		if (savedRoomID) {
			setRoomID(savedRoomID)
			setCurrentRoom(savedRoomID)
		}

		if (savedInHuddle) {
			setInHuddle(savedInHuddle)
		}
	}, [setCurrentRoom])

	// Store huddle state in local storage when it changes
	useEffect(() => {
		localStorage.setItem('roomID', roomID)
		localStorage.setItem('inHuddle', inHuddle)
	}, [roomID, inHuddle])

	const handleJoinRoom = () => {
		if (roomID.trim()) {
			console.log(`Joining room: ${roomID}`)
			socket.emit('room', roomID)
			setCurrentRoom(roomID)
			setInHuddle(true)
			alert('Joined room successfully!')
		} else {
			alert('Please enter a room ID.')
		}
	}

	return (
		<AnimatePresence>
			{openSetting && (
				<>
					<motion.div
						className={`absolute z-10 flex flex-col rounded-[2rem] bg-green-darkest p-5 opacity-[0.98] ${
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
								{!inHuddle && (
									<>
										<input
											type="text"
											className="flex-grow rounded bg-green-lightest bg-opacity-30 py-2 text-center text-xl text-white placeholder-opacity-30 outline-none"
											placeholder="#HuddleID"
											value={roomID}
											onChange={(e) => setRoomID(e.target.value)}
										/>
										<div className="flex gap-2">
											<button
												className="w-full rounded bg-green-lightest py-2 text-sm text-black transition ease-in-out hover:bg-green-dark hover:text-white"
												onClick={handleJoinRoom}
											>
												Join Huddle
											</button>
										</div>
									</>
								)}
								{inHuddle && (
									<>
										<div className="flex items-center justify-between gap-2">
											<h1 className="flex-grow rounded-lg bg-green p-2 text-center text-white">
												Huddle ID: {roomID}
											</h1>
											<button
												className="rounded-lg bg-[#E37F79] p-2 text-black"
												onClick={() => {
													setInHuddle(false)
													setCurrentRoom('')
													setRoomID('')
												}}
											>
												Leave Huddle
											</button>
										</div>
									</>
								)}
							</div>
						</div>
						{/* An svg and encourage text */}
						<div className="flex-grow">
							{!inHuddle && (
								<>
									<div className="flex justify-center pt-4 align-middle">
										<img src="/assets/svgs/placeholder.svg" alt="placeholder" />
									</div>

									<p className="mt-5 text-center text-[#A3ABA2]">
										Huddle up with friends for fun, focus, and exclusive
										solantrees!
									</p>
								</>
							)}
							{inHuddle && (
								<>
									<div className="flex justify-center pb-4 pt-8 align-middle">
										<img src="/assets/svgs/huddle.svg" alt="huddle" />
									</div>
								</>
							)}
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
