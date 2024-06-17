import React from 'react'

function DateRange() {
	return (
		<div className="flex flex-row justify-center gap-4 py-4 pt-0 align-middle">
			<button className="w-[9.375rem] rounded-[1.2rem] bg-green-lightest p-1 px-2 font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white">
				Today
			</button>
			<button className="w-[9.375rem] rounded-[1.2rem] bg-green-lightest p-1 px-2 font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white">
				Week
			</button>
			<button className="w-[9.375rem] rounded-[1.2rem] bg-green-lightest p-1 px-2 font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white">
				Month
			</button>
			<button className="w-[9.375rem] rounded-[1.2rem] bg-green-lightest p-1 px-2 font-bold uppercase text-black transition ease-in-out hover:bg-green-dark hover:text-white">
				Year
			</button>
		</div>
	)
}

export default DateRange
