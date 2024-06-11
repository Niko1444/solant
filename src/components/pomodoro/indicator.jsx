export default function Indicator({ stage }) {
	return (
		<>
			<div className="absolute left-[2.7rem] top-12 flex h-2.5 w-[55px] items-start gap-[5px]">
				{stage === 0 && (
					<>
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
					</>
				)}

				{stage === 1 && (
					<>
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
					</>
				)}

				{stage === 1 && (
					<>
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
					</>
				)}

				{stage === 2 && (
					<>
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
					</>
				)}

				{stage === 3 && (
					<>
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-lightest" />
					</>
				)}

				{stage === 4 && (
					<>
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
						<div className="relative h-2.5 w-2.5 rounded-[5px] bg-green-darkest" />
					</>
				)}
			</div>
		</>
	)
}
