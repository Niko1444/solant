'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import ModalSetting from '../pomodoro/modal-setting'
import { FiBellOff } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import Indicator from './indicator'

export default function Timer() {
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

	const pomodoroRef = useRef()
	const shortBreakRef = useRef()
	const longBreakRef = useRef()

	const updateTimeDefaultValue = () => {
		setPomodoro(pomodoroRef.current.value)
		setShortBreak(shortBreakRef.current.value)
		setLongBreak(longBreakRef.current.value)
		setOpenSetting(false)
		setSecond(0)
		setConsumedSecond(0)
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

	const getTickingTime = () => {
		const timeStage = {
			0: pomodoro,
			1: shortBreak,
			2: longBreak,
		}
		return timeStage[stage]
	}

	const updateMinute = () => {
		const updateStage = {
			0: setPomodoro,
			1: setShortBreak,
			2: setLongBreak,
		}
		return updateStage[stage]
	}

	const reset = () => {
		setConsumedSecond(0)
		setTicking(false)
		setSecond(0)
		updateTimeDefaultValue()
	}

	const timeUp = () => {
		reset()
		setIsTimeUp(true)
	}

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
	}, [getTickingTime, updateMinute, seconds])

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
	}, [seconds, pomodoro, shortBreak, longBreak, ticking, clockTicking])

	useEffect(() => {
		if (isTimeUp) {
			if (stage === 0) {
				setCompletedPomodoros((prev) => prev + 1)
				if ((completedPomodoros + 1) % 4 === 0) {
					setStage(2) // Move to Long Break after 4 Pomodoro sessions
				} else {
					setStage(1) // Move to Short Break
				}
			} else {
				setStage(0) // Move to Pomodoro
			}
		}
	}, [isTimeUp, stage, completedPomodoros, switchStage])

	return (
		<div className="mx-auto mt-10 flex w-10/12 flex-col items-center justify-center pt-5">
			{/* Pomodoro, Short Break, Long Break, and Indicator */}
			<div className="relative flex items-center gap-5">
				{['Pomodoro', 'Short Break', 'Long Break'].map((option, index) => (
					<motion.h1
						key={index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={` ${
							index === stage
								? 'flex h-[2.375rem] w-[9.375rem] cursor-pointer items-center justify-center rounded-2xl bg-green-dark text-[1.23725rem] text-white transition ease-in-out hover:bg-green-dark'
								: 'flex h-[2.375rem] w-[9.375rem] cursor-pointer items-center justify-center rounded-2xl bg-green-lightest text-[1.23725rem] transition ease-in-out hover:bg-green-dark hover:text-white'
						} cursor-pointer rounded p-1 transition-all`}
						onClick={() => switchStage(index)}
					>
						{option}
					</motion.h1>
				))}
				<Indicator stage={completedPomodoros % 4} />
			</div>

			{/* Timer */}
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="m-0 select-none font-secondary text-8xl text-[200px] font-bold text-white"
			>
				{getTickingTime()}:{seconds.toString().padStart(2, '0')}
			</motion.h1>
			<div className="flex items-center gap-2">
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="mb-4 h-[3.5625rem] w-[14.0625rem] rounded-3xl bg-green-lightest px-16 py-2 text-2xl font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white"
					onClick={startTimer}
				>
					{ticking ? 'Stop' : 'Start'}
				</motion.button>
				{isTimeUp && (
					<FiBellOff
						className="cursor-pointer text-3xl text-white"
						onClick={muteAlarm}
					/>
				)}
			</div>

			{/* Reset & PiP button */}
			<div className="flex flex-row justify-center gap-3 align-middle">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Image
						src="/assets/svgs/restart-button.svg"
						alt="Restart Button"
						width={50}
						height={50}
						onClick={reset}
						className="cursor-pointer"
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Image
						src="/assets/svgs/minimize-button.svg"
						alt="Enter PiP Button"
						width={50}
						height={50}
						className="cursor-pointer"
					/>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Image
						src="/assets/svgs/setting-button.svg"
						alt="Pomodoro Setting Button"
						width={50}
						height={50}
						onClick={() => setOpenSetting(true)}
						className="cursor-pointer"
					/>
				</motion.div>
			</div>
			<AnimatePresence>
				{openSetting && (
					<ModalSetting
						openSetting={openSetting}
						setOpenSetting={setOpenSetting}
						pomodoroRef={pomodoroRef}
						shortBreakRef={shortBreakRef}
						longBreakRef={longBreakRef}
						updateTimeDefaultValue={updateTimeDefaultValue}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}
