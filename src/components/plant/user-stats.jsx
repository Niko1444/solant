import React from 'react'

const PlantStats = ({ stats }) => (
	<div className="flex flex-[60%] flex-wrap">
		{stats.map((stat, index) => (
			<div key={index} className="flex flex-[50%] flex-col text-white">
				<span>{stat.label}</span>
				<div className="align-center flex flex-row items-center gap-3">
					<span className="font-secondary text-[4rem] leading-[3rem] text-green-lightest">
						{stat.value}
					</span>
					<span>{stat.unit}</span>
				</div>
			</div>
		))}
	</div>
)

export default PlantStats
