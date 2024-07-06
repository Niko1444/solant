'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Timer from '../pomodoro/timer'
import ChatApp from './chat'
import Event from './event'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

export default function Pomodoro() {
	const [pomodoro, setPomodoro] = useState(25)
	const [shortBreak, setShortBreak] = useState(5)
	const [longBreak, setLongBreak] = useState(10)
	const [seconds, setSecond] = useState(0)
	const [stage, setStage] = useState(0)
	const [consumedSecond, setConsumedSecond] = useState(0)
	const [ticking, setTicking] = useState(false)
	const [isTimeUp, setIsTimeUp] = useState(false)
	const [completedPomodoros, setCompletedPomodoros] = useState(0)
	const [openSetting, setOpenSetting] = useState(false)
	const [openChat, setOpenChat] = useState(false)
	const [openEvent, setOpenEvent] = useState(false)
	const [currentRoom, setCurrentRoom] = useState('')

	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1224px)',
	})

	const initialPomodoroRef = useRef(25)
	const initialShortBreakRef = useRef(5)
	const initialLongBreakRef = useRef(10)

	const pomodoroRef = useRef()
	const shortBreakRef = useRef()
	const longBreakRef = useRef()

	const toggleChat = () => {
		setOpenChat((openChat) => !openChat)
	}

	const toggleEvent = () => {
		setOpenEvent((openEvent) => !openEvent)
	}

	const updateTimeDefaultValue = () => {
		if (pomodoroRef.current && shortBreakRef.current && longBreakRef.current) {
			const newPomodoro = parseInt(pomodoroRef.current.value)
			const newShortBreak = parseInt(shortBreakRef.current.value)
			const newLongBreak = parseInt(longBreakRef.current.value)

			setPomodoro(newPomodoro)
			setShortBreak(newShortBreak)
			setLongBreak(newLongBreak)

			initialPomodoroRef.current = newPomodoro
			initialShortBreakRef.current = newShortBreak
			initialLongBreakRef.current = newLongBreak

			setOpenSetting(false)
			setSecond(0)
			setConsumedSecond(0)
		}
	}

	const switchStage = useCallback(
		(index) => {
			const isYes =
				consumedSecond && stage !== index
					? confirm('Are you sure you want to switch?')
					: false
			if (isYes) {
				reset()
				setStage(index)
			} else if (!consumedSecond) {
				setStage(index)
			}
		},
		[consumedSecond, stage],
	)

	const getTickingTime = useCallback(() => {
		const timeStage = {
			0: pomodoro,
			1: shortBreak,
			2: longBreak,
		}
		return timeStage[stage]
	}, [pomodoro, shortBreak, longBreak, stage])

	const updateMinute = useCallback(() => {
		const updateStage = {
			0: setPomodoro,
			1: setShortBreak,
			2: setLongBreak,
		}
		return updateStage[stage]
	}, [stage])

	const reset = useCallback(() => {
		setPomodoro(initialPomodoroRef.current)
		setShortBreak(initialShortBreakRef.current)
		setLongBreak(initialLongBreakRef.current)
		setConsumedSecond(0)
		setTicking(false)
		setSecond(0)
	}, [])

	const timeUp = useCallback(() => {
		setIsTimeUp(true)
		setTicking(false)
		if (stage === 0) {
			setCompletedPomodoros((prev) => (prev + 1) % 4)
		}
	}, [stage])

	const clockTicking = useCallback(() => {
		const minutes = getTickingTime()
		const setMinutes = updateMinute()

		if (minutes === 0 && seconds === 0) {
			timeUp()
		} else if (seconds === 0) {
			setMinutes((minute) => minute - 1)
			setSecond(59)
		} else {
			setSecond((second) => second - 1)
		}
	}, [getTickingTime, updateMinute, seconds, timeUp])

	const startTimer = () => {
		setIsTimeUp(false)
		setTicking((ticking) => !ticking)
	}

	useEffect(() => {
		window.onbeforeunload = () => {
			return consumedSecond ? 'Show warning' : null
		}

		const timer = setInterval(() => {
			if (ticking) {
				setConsumedSecond((value) => value + 1)
				clockTicking()
			}
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	}, [ticking, clockTicking, consumedSecond])

	useEffect(() => {
		if (isTimeUp) {
			console.log('Time is up, ringing the bell!')
			// You can add additional logic for ringing the bell here
		}
	}, [isTimeUp])

	return (
		<>
			<div className="font-primary">
				<div className="mx-auto flex max-w-2xl flex-col">
					{/* Timer */}
					<Timer
						stage={stage}
						switchStage={switchStage}
						getTickingTime={getTickingTime}
						seconds={seconds}
						ticking={ticking}
						startTimer={startTimer}
						isTimeUp={isTimeUp}
						reset={reset}
						setOpenSetting={setOpenSetting}
						openSetting={openSetting}
						pomodoroRef={pomodoroRef}
						shortBreakRef={shortBreakRef}
						longBreakRef={longBreakRef}
						updateTimeDefaultValue={updateTimeDefaultValue}
						completedPomodoros={completedPomodoros}
						setCurrentRoom={setCurrentRoom}
					/>
				</div>
				{/* Button to Open Chat in the left */}
				{isDesktopOrLaptop && (
					<div className="fixed left-[-1.5rem] top-[45%] z-30 flex -translate-y-1/2 transform items-center justify-center">
						<div
							className="relative h-[150px] w-[150px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
							onClick={toggleChat}
						>
							<Image
								src="/assets/svgs/chat-button.svg"
								alt="A button has a chat bubble image inside"
								layout="fill"
								objectFit="contain"
							/>
						</div>
						<AnimatePresence>
							{openChat && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.2 }}
								>
									<ChatApp currentRoom={currentRoom} />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				)}
			</div>
			{/* Button to Open Event in the right */}
			{isDesktopOrLaptop && (
				<div className="fixed right-[-1.5rem] top-[45%] z-30 flex -translate-y-1/2 transform items-center justify-center">
					<div
						className="relative h-[150px] w-[150px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
						onClick={toggleEvent}
					>
						<Image
							src="/assets/svgs/event-button.svg"
							alt="A button has a trophy image inside"
							layout="fill"
							objectFit="contain"
						/>
					</div>
				</div>
			)}
			<AnimatePresence>
				{openEvent && (
					<motion.div
						className="absolute inset-0 m-28"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
					>
						<Event />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
