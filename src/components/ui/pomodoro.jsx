'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Timer from '../pomodoro/timer'

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

	const pomodoroRef = useRef()
	const shortBreakRef = useRef()
	const longBreakRef = useRef()

	const updateTimeDefaultValue = () => {
		if (pomodoroRef.current && shortBreakRef.current && longBreakRef.current) {
			setPomodoro(parseInt(pomodoroRef.current.value))
			setShortBreak(parseInt(shortBreakRef.current.value))
			setLongBreak(parseInt(longBreakRef.current.value))
			setOpenSetting(false)
			setSecond(0)
			setConsumedSecond(0)
		}
	}

	/* eslint-enable react-hooks/exhaustive-deps */
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
	/* eslint-enable react-hooks/exhaustive-deps */

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
		setConsumedSecond(0)
		setTicking(false)
		setSecond(0)
		updateTimeDefaultValue()
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
				/>
			</div>
		</div>
	)
}
