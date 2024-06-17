'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Indicator from './indicator'
import ModalSetting from '../pomodoro/modal-setting'

export default function Timer({
	stage,
	switchStage,
	getTickingTime,
	seconds,
	ticking,
	startTimer,
	isTimeUp,
	reset,
	setOpenSetting,
	openSetting,
	pomodoroRef,
	shortBreakRef,
	longBreakRef,
	updateTimeDefaultValue,
	completedPomodoros,
}) {
	const playerContainerRef = useRef(null)
	const hiddenPlayerContainerRef = useRef(null)
	const [pipWindow, setPipWindow] = useState(null)

	const copyStyles = (sourceDoc, targetDoc) => {
		Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
			if (styleSheet.href) {
				const link = document.createElement('link')
				link.rel = 'stylesheet'
				link.href = styleSheet.href
				targetDoc.head.appendChild(link)
			} else if (styleSheet.cssRules) {
				const style = document.createElement('style')
				Array.from(styleSheet.cssRules).forEach((rule) => {
					style.appendChild(document.createTextNode(rule.cssText))
				})
				targetDoc.head.appendChild(style)
			}
		})
	}

	const openPiP = async () => {
		const hiddenPlayerContainer = hiddenPlayerContainerRef.current

		if (hiddenPlayerContainer) {
			const newPipWindow = await documentPictureInPicture.requestWindow({
				width: 400,
				height: 225,
			})

			copyStyles(document, newPipWindow.document)

			// Move the hidden player to the Picture-in-Picture window.
			newPipWindow.document.body.appendChild(hiddenPlayerContainer)

			// Add an exit button to the PiP window
			const exitButton = document.createElement('button')
			exitButton.textContent = 'X'
			exitButton.style.borderRadius = '7px'
			exitButton.style.position = 'absolute'
			exitButton.style.top = '10px'
			exitButton.style.right = '10px'
			exitButton.style.zIndex = '1000'
			exitButton.style.padding = '5px 10px'
			exitButton.style.backgroundColor = '#E4EC9C'
			exitButton.style.color = '#000000'
			exitButton.style.border = 'none'
			exitButton.style.cursor = 'pointer'
			newPipWindow.document.body.appendChild(exitButton)

			const movePlayerBack = () => {
				const mainDocumentHiddenPlayerContainer = document.getElementById(
					'hiddenPlayerContainerWrapper',
				)
				const pipHiddenPlayer = newPipWindow.document.body.querySelector(
					'#hiddenPlayerContainer',
				)
				if (mainDocumentHiddenPlayerContainer && pipHiddenPlayer) {
					mainDocumentHiddenPlayerContainer.appendChild(pipHiddenPlayer)
					newPipWindow.close()
				}
			}

			exitButton.addEventListener('click', movePlayerBack)
			newPipWindow.addEventListener('pagehide', movePlayerBack)

			setPipWindow(newPipWindow)
		}
	}

	useEffect(() => {
		return () => {
			if (pipWindow) {
				const hiddenPlayerContainer = pipWindow.document.body.querySelector(
					'#hiddenPlayerContainer',
				)
				if (hiddenPlayerContainer) {
					const mainDocumentHiddenPlayerContainer = document.getElementById(
						'hiddenPlayerContainerWrapper',
					)
					mainDocumentHiddenPlayerContainer.appendChild(hiddenPlayerContainer)
				}
				pipWindow.close()
			}
		}
	}, [pipWindow])

	return (
		<div className="mx-auto flex w-10/12 flex-col items-center justify-center pt-5">
			{/* Pomodoro, Short Break, Long Break, and Indicator */}
			<div className="relative flex items-center gap-2 sm:gap-5">
				{['Pomodoro', 'Short Break', 'Long Break'].map((option, index) => (
					<motion.h1
						key={index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={` ${
							index === stage
								? 'flex h-[2rem] w-[7rem] cursor-pointer items-center justify-center rounded-2xl bg-green-dark text-[1rem] text-white transition ease-in-out hover:bg-green-dark sm:h-[2.375rem] sm:w-[9.375rem] sm:text-[1.23725rem]'
								: 'flex h-[2rem] w-[7rem] cursor-pointer items-center justify-center rounded-2xl bg-green-lightest text-[1rem] transition ease-in-out hover:bg-green-dark hover:text-white sm:h-[2.375rem] sm:w-[9.375rem] sm:text-[1.23725rem]'
						} cursor-pointer rounded p-1 transition-all`}
						onClick={() => switchStage(index)}
					>
						{option}
					</motion.h1>
				))}
				<Indicator stage={completedPomodoros} />
			</div>

			{/* Visible Timer */}
			<div id="playerContainerWrapper">
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					id="playerContainer"
					ref={playerContainerRef}
					className="m-0 select-none font-secondary text-[150px] font-bold text-white sm:text-[200px]"
					style={{
						lineHeight: '1',
					}}
				>
					{getTickingTime()}:{seconds.toString().padStart(2, '0')}
				</motion.h1>
			</div>

			{/* Hidden Timer for PiP */}
			<div id="hiddenPlayerContainerWrapper" className="hidden">
				<motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					id="hiddenPlayerContainer"
					ref={hiddenPlayerContainerRef}
					className="m-0 select-none font-secondary text-[50px] font-bold text-white sm:text-[100px]"
				>
					{getTickingTime()}:{seconds.toString().padStart(2, '0')}
				</motion.h1>
			</div>

			<div className="flex items-center gap-2 sm:gap-4">
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="mb-4 h-[2.5rem] w-[10rem] rounded-3xl bg-green-lightest px-10 py-2 text-xl font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white sm:h-[3.5625rem] sm:w-[14.0625rem] sm:px-16 sm:text-2xl"
					onClick={startTimer}
				>
					{ticking ? 'Stop' : 'Start'}
				</motion.button>
				{isTimeUp && console.log('Time is up, ringing the bell!')}
			</div>

			{/* Reset & PiP button */}
			{/* Reset */}
			<div className="flex flex-row justify-center gap-3 align-middle">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Image
						src="/assets/svgs/restart-button.svg"
						alt="Restart Button"
						width={40}
						height={40}
						onClick={reset}
						className="hover:animate-spin-once cursor-pointer sm:h-[50px] sm:w-[50px]"
					/>
				</motion.div>

				{/* PiP */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Image
						src="/assets/svgs/minimize-button.svg"
						alt="Enter PiP Button"
						width={40}
						height={40}
						onClick={openPiP}
						className="hover:animate-spin-once cursor-pointer sm:h-[50px] sm:w-[50px]"
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
						width={40}
						height={40}
						onClick={() => setOpenSetting(true)}
						className="hover:animate-spin-once cursor-pointer sm:h-[50px] sm:w-[50px]"
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
