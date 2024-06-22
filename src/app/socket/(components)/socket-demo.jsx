'use client'

import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import { io } from 'socket.io-client'

const socket = io(
	process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000/',
)

const ChatApp = () => {
	const [messages, setMessages] = useState([])
	const [inputValue, setInputValue] = useState('')
	const [roomValue, setRoomValue] = useState('')
	const [isInRoom, setIsInRoom] = useState(false) // New state to track if the user is in a room
	const messagesEndRef = useRef(null)

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!isInRoom) {
			alert('Please join a room first.') // Alert the user to join a room first
			return // Prevent the message from being sent
		}
		if (inputValue.trim()) {
			socket.emit('message', inputValue)
			setInputValue('')
		}
	}

	const handleRoom = (event) => {
		event.preventDefault()
		if (roomValue.trim()) {
			socket.emit('room', roomValue)
			setRoomValue('')
			setIsInRoom(true) // Set isInRoom to true when the user joins a room
		}
	}

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	useEffect(() => {
		const roomHandler = (data) => {
			setMessages((prevMessages) => [...prevMessages, data.message])
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
		<div>
			<ul id="messages">
				{messages.map((message, index) => (
					<li key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
						{message}
					</li>
				))}
				<div ref={messagesEndRef} />
			</ul>

			<div>
				<form id="formRoom" onSubmit={handleRoom}>
					<input
						id="input"
						autoComplete="off"
						value={roomValue} // Use roomValue here
						onChange={(e) => setRoomValue(e.target.value)} // And here
					/>
					<button type="submit">Room</button>
				</form>
			</div>

			<div>
				<form id="form" onSubmit={handleSubmit}>
					<input
						id="input"
						autoComplete="off"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	)
}

export default ChatApp
