import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { motion } from 'framer-motion'
import leaderboardData from '../../data/leaderboard.json'

const avatars = [
	'/assets/avatars/1.png',
	'/assets/avatars/2.png',
	'/assets/avatars/3.png',
	'/assets/avatars/4.png',
	'/assets/avatars/5.png',
	'/assets/avatars/6.png',
	'/assets/avatars/7.png',
	'/assets/avatars/8.png',
	'/assets/avatars/9.png',
	'/assets/avatars/10.png',
]

const Event = () => {
	const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
	const [activeTab, setActiveTab] = useState('focusedTime')
	const [leaderboard, setLeaderboard] = useState([])

	const tabs = {
		focusedTime: 'Focused Time',
		looksRated: 'Looks Rating',
		collectivePoints: 'Collective Points',
	}

	const tabColors = {
		focusedTime: 'bg-green-500',
		looksRated: 'bg-red-500',
		collectivePoints: 'bg-blue-500',
	}

	const assignRandomAvatars = () => {
		const updatedLeaderboard = leaderboardData[activeTab].map((entry) => ({
			...entry,
			avatar: avatars[Math.floor(Math.random() * avatars.length)],
		}))
		setLeaderboard(updatedLeaderboard)
	}

	useEffect(() => {
		assignRandomAvatars()
	}, [activeTab])

	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<motion.div
				className={`${
					isDesktopOrLaptop ? 'h-[43.125rem] w-[81.25rem]' : 'h-full w-full'
				} flex flex-col rounded-[2rem] bg-green-darkest p-5 opacity-[0.98]`}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3 }}
			>
				{/* Events and Leaderboard Sections */}
				<div className="flex flex-grow">
					{/* Events Section */}
					<motion.div
						className="w-2/3 pr-4"
						initial={{ x: -100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="mb-4 flex justify-center rounded-lg bg-green-lightest">
							<h1 className="font-primary text-4xl text-black">EVENTS</h1>
						</div>
						<div className="flex flex-row gap-2 align-middle">
							<h2 className="text-md mb-2 font-primary text-green-lightest">
								happening now
							</h2>
							<div className="mb-4 flex-grow border-b-2 border-green-lightest"></div>
						</div>

						<div className="hover: mb-4 cursor-pointer rounded-lg bg-white p-1">
							<div className="relative flex flex-col items-center justify-center align-middle">
								<img
									src="/assets/events/mid-autumn.png"
									alt="mid-autumn festival"
									className="w-full rounded-lg object-cover"
								/>
							</div>
						</div>
					</motion.div>

					{/* Leaderboard Section */}
					<motion.div
						className="w-1/3 pl-4"
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="mb-4 flex justify-center rounded-lg bg-green-lightest">
							<h1 className="font-primary text-4xl text-black">LEADERBOARD</h1>
						</div>
						<div className="rounded-lg bg-green-dark p-4 font-primary">
							<ul>
								<li className="mb-2 flex justify-between font-bold text-green-lightest">
									<div>Rank</div>
									<div>Name</div>
									<div>
										{activeTab === 'focusedTime'
											? 'Focused Time'
											: activeTab === 'looksRated'
												? 'Hearts'
												: 'CP'}
									</div>
								</li>
								{leaderboard.map((entry, index) => (
									<li
										key={index}
										className={`mb-2 flex justify-between text-white ${
											index % 2 === 0 ? 'bg-green-dark' : 'bg-green'
										} rounded-lg p-2`}
									>
										<div>#{entry.rank}</div>
										<div className="flex items-center">
											<img
												src={entry.avatar}
												alt={entry.name}
												className="mr-2 h-6 w-6 rounded-full"
											/>
											<span className="flex-1">{entry.name}</span>
										</div>
										<div>{entry.focused || entry.heart || entry.CP}</div>
									</li>
								))}
							</ul>
							<div className="mt-4 flex justify-around text-white">
								<div className="flex gap-1">
									{Object.keys(tabs).map((tabKey) => (
										<button
											key={tabKey}
											className={`flex w-[7.8rem] items-center justify-center py-2 align-middle text-sm ${
												activeTab === tabKey ? tabColors[tabKey] : 'bg-green'
											} rounded-lg text-white`}
											onClick={() => setActiveTab(tabKey)}
										>
											<span>{tabs[tabKey]}</span>
										</button>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	)
}

export default Event
