import React from 'react'
import { FiBellOff } from 'react-icons/fi'

export default function Timer({
	stage,
	switchStage,
	getTickingTime,
	seconds,
	ticking,
	startTimer,
	isTimeUp,
	muteAlarm,
	reset,
}) {
	const options = ['Pomodoro', 'Short Break', 'Long Break']
	return (
		<div className="mx-auto mt-10 flex w-10/12 flex-col items-center justify-center pt-5">
			<div className="flex items-center gap-5">
				{options.map((option, index) => {
					return (
						<h1
							key={index}
							className={` ${
								index === stage
									? 'bg-green-dark hover:bg-green-dark flex h-[2.375rem] w-[9.375rem] cursor-pointer items-center justify-center rounded-2xl text-white transition ease-in-out'
									: 'bg-green-lightest hover:bg-green-dark flex h-[2.375rem] w-[9.375rem] cursor-pointer items-center justify-center rounded-2xl transition ease-in-out hover:text-white'
							} cursor-pointer rounded p-1 transition-all`}
							onClick={() => switchStage(index)}
						>
							{option}
						</h1>
					)
				})}
			</div>
			<h1 className="font-secondary m-0 select-none text-8xl text-[200px] font-bold text-white">
				{getTickingTime()}:{seconds.toString().padStart(2, '0')}
			</h1>
			<div className="flex items-center gap-2">
				<button
					className="bg-green-lightest rounded-3xl px-16 py-2 text-2xl font-bold uppercase text-black"
					onClick={startTimer}
				>
					{ticking ? 'Stop' : 'Start'}
				</button>
				{isTimeUp && (
					<FiBellOff
						className="cursor-pointer text-3xl text-white"
						onClick={muteAlarm}
					/>
				)}
			</div>
			{ticking && (
				<button className="mt-5 uppercase text-white underline" onClick={reset}>
					Reset
				</button>
			)}
		</div>
	)
}
