import React from 'react'
import { FiX } from 'react-icons/fi'

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
		<>
			<div
				className={`absolute left-0 top-0 h-full w-full bg-black bg-opacity-30 ${
					openSetting ? '' : 'hidden'
				}`}
				onClick={() => setOpenSetting(false)}
			></div>
			<div
				className={`absolute left-1/2 top-1/2 w-11/12 max-w-xl rounded-md bg-white p-5 sm:w-96 ${
					openSetting ? '' : 'hidden'
				}`}
				style={{
					transform: 'translate(-50%,-50%)',
				}}
			>
				<div className="flex items-center justify-between text-gray-400">
					<h1 className="font-bold uppercase tracking-wider">Time setting</h1>
					<FiX
						className="cursor-pointer text-2xl"
						onClick={() => setOpenSetting(false)}
					/>
				</div>
				<div className="mb-5 mt-5 h-1 w-full bg-gray-400"></div>
				<div className="flex gap-5">
					{inputs.map((input, index) => {
						return (
							<div key={index}>
								<h1 className="text-sm text-gray-400">{input.value}</h1>
								<input
									defaultValue={input.defaultValue}
									type="number"
									className="w-full rounded bg-gray-400 bg-opacity-30 py-2 text-center outline-none"
									ref={input.ref}
								/>
							</div>
						)
					})}
				</div>
				<button
					className="mt-5 w-full rounded bg-green-500 py-2 uppercase text-white"
					onClick={updateTimeDefaultValue}
				>
					Save
				</button>
			</div>
		</>
	)
}

export default React.memo(ModalSetting)
