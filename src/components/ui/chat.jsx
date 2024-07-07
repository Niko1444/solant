import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

// Ensure the environment variable is set correctly
// Create the socket connection
const socket = io(
	'https://render-socket-ylqm.onrender.com/' || 'http://localhost:3001',
)

const ChatApp = ({ currentRoom }) => {
	const [messages, setMessages] = useState([])
	const [inputValue, setInputValue] = useState('')
	const [roomValue, setRoomValue] = useState(currentRoom || '')
	const [isInRoom, setIsInRoom] = useState(!!currentRoom)
	const messagesEndRef = useRef(null)

	useEffect(() => {
		if (currentRoom) {
			socket.emit('room', currentRoom)
			setIsInRoom(true)
		}
	}, [currentRoom])

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!isInRoom) {
			alert('Please join a room first.')
			return
		}
		if (inputValue.trim()) {
			socket.emit('message', { room: roomValue, message: inputValue })
			setInputValue('')
		}
	}

	const handleRoom = (event) => {
		event.preventDefault()
		if (roomValue.trim()) {
			socket.emit('room', roomValue)
			setIsInRoom(true)
		}
	}

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	useEffect(() => {
		const roomHandler = (data) => {
			setMessages((prevMessages) => [
				...prevMessages,
				{ message: `Joined room ${data.room}`, type: 'system' },
			])
			setRoomValue(data.room)
		}

		socket.on('room', roomHandler)

		return () => {
			socket.off('room', roomHandler)
		}
	}, [])

	useEffect(() => {
		const messageHandler = (data) => {
			setMessages((prevMessages) => [...prevMessages, data])
		}

		socket.on('message', messageHandler)

		return () => {
			socket.off('message', messageHandler)
		}
	}, [])

	return (
		<div className="m-4 flex h-[36rem] w-[26rem] flex-col overflow-hidden rounded-lg bg-green-lightest opacity-90 shadow-lg">
			<div className="bg-green-dark p-2 text-center text-white">
				{isInRoom
					? `Huddle ID: ${roomValue}`
					: 'Please join a huddle first > Settings'}
			</div>
			<ul id="messages" className="flex-1 space-y-2 overflow-y-auto p-2">
				{messages.map((message, index) => (
					<li
						key={index}
						className={
							message.type === 'system'
								? 'text-center text-black'
								: index % 2 === 0
									? 'rounded bg-gray-200 p-2'
									: 'rounded bg-gray-100 p-2'
						}
					>
						{message.message}
					</li>
				))}
				<div ref={messagesEndRef} />
			</ul>
			<div className="p-2">
				{!isInRoom && (
					<form onSubmit={handleRoom} className="mb-2 hidden">
						<input
							type="text"
							autoComplete="off"
							value={roomValue}
							onChange={(e) => setRoomValue(e.target.value)}
							placeholder="Enter room ID"
							className="flex-grow rounded-l border p-2 outline-none"
						/>
						<button
							type="submit"
							className="rounded-r bg-green-dark p-2 text-white"
						>
							Join
						</button>
					</form>
				)}
				{isInRoom && (
					<form id="form" onSubmit={handleSubmit} className="flex">
						<input
							id="input"
							autoComplete="off"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="Type a message..."
							className="flex-grow rounded-l border p-2 outline-none"
						/>
						<button
							type="submit"
							className="rounded-r bg-green-dark p-2 text-white"
						>
							Send
						</button>
					</form>
				)}
			</div>
		</div>
	)
}

export default ChatApp
