import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import './style.css'
import axios from 'axios'

// Ensure the environment variable is set correctly

// Create the socket connection
const socket = io(
	'https://render-socket-ylqm.onrender.com/' || 'http://localhost:3001',
)

const ChatApp = () => {
	const [messages, setMessages] = useState([])
	const [inputValue, setInputValue] = useState('')
	const [roomValue, setRoomValue] = useState('')
	const [isInRoom, setIsInRoom] = useState(false)
	const messagesEndRef = useRef(null)

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!isInRoom) {
			alert('Please join a room first.')
			return
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
			setIsInRoom(true)
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
						value={roomValue}
						onChange={(e) => setRoomValue(e.target.value)}
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
