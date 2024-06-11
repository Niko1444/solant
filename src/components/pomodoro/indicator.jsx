import { motion } from 'framer-motion'

export default function Indicator({ stage }) {
	return (
		<>
			<div className="absolute left-[2.7rem] top-12 flex h-2.5 w-[55px] items-start gap-[5px]">
				{stage === 0 && (
					<>
						{[...Array(4)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest"
							/>
						))}
					</>
				)}

				{stage === 1 && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest"
						/>
						{[...Array(3)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest"
							/>
						))}
					</>
				)}

				{stage === 2 && (
					<>
						{[...Array(2)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest"
							/>
						))}
						{[...Array(2)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest"
							/>
						))}
					</>
				)}

				{stage === 3 && (
					<>
						{[...Array(3)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest"
							/>
						))}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest"
						/>
					</>
				)}

				{stage === 4 && (
					<>
						{[...Array(4)].map((_, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest"
							/>
						))}
					</>
				)}
			</div>
		</>
	)
}
