/* eslint-disable @next/next/no-img-element */
"use client";
import { useFetchUserInfo } from "@/lib/data";
import React, { useEffect, useState } from "react";

const usersMessages = {
	"user-1": {
		id: 1,
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		name: "John Doe",
		time: "11:30",
		preview:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus.",
		messages: [
			{
				id: "m1",
				content: "Hey there! How are you today?",
				timestamp: "2024-03-10T09:00:00.000Z",
				from: "user-2",
			},
			{
				id: "m2",
				content: "Just wanted to check in about our meeting tomorrow.",
				timestamp: "2024-03-10T09:15:00.000Z",
				from: "user-2",
			},
			{
				id: "m3",
				content: "Can we possibly push it to 3pm?",
				timestamp: "2024-03-10T10:30:00.000Z",
				from: "user-2",
			},
			{
				id: "m4",
				content: "Let me know what works for you!",
				timestamp: "2024-03-10T11:00:00.000Z",
				from: "user-1",
			},
			{
				id: "m5",
				content: "Sure, 3pm works for me. See you then!",
				timestamp: "2024-03-10T11:05:00.000Z",
				from: "user-2",
			},
		],
	},
	"user-2": {
		id: 2,
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
		name: "Sandra Johnson",
		time: "10:31",
		preview:
			"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
	},
	// more messages
};

export default function Messages() {
	const [users, setUsers] = useState({});
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [messages, setMessages] = useState([]);

	const { userDetails } = useFetchUserInfo();
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		if (userDetails && userDetails.user) {
			setUserId(userDetails.user.userId);
		}
	}, [userDetails]);

	// Fetch messages for a selected user
	const fetchMessages = async (otherUserId: any) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/messages/history/${userId}?otherUserId=${otherUserId}`
			);
			if (!response.ok) throw new Error("Failed to fetch messages");
			const data = await response.json();
			setMessages(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// Replace with actual user ID and the corresponding otherUserId
		if (selectedUserId) fetchMessages("otherUserId");
	}, [selectedUserId]);

	// Function to handle when a user is clicked
	const handleUserClick = (userId: any) => {
		setSelectedUserId(userId);
	};

	// Get messages for the selected user
	// const messages =
	// 	selectedUser && usersMessages[selectedUser].messages
	// 		? usersMessages[selectedUser].messages
	// 		: [];

	return (
		<>
			<div className="flex h-screen bg-gray-700">
				<aside className="w-1/4 bg-gray-600 p-4 overflow-y-auto">
					<div className="space-y-4">
						{Object.entries(usersMessages).map(([userId, user]) => (
							<div
								key={userId}
								className={`flex items-center px-2 py-1 cursor-pointer ${
									selectedUserId === userId
										? "bg-gray-700 rounded-lg py-4 px-2"
										: ""
								}`}
								onClick={() => handleUserClick(userId)}>
								<img
									src={user.avatar}
									alt=""
									className="h-10 w-10 rounded-full"
								/>
								<div className="ml-3">
									<p className="text-sm font-semibold">{user.name}</p>
									<p className="text-xs text-white">{user.preview}</p>
								</div>
								<span className="ml-auto text-xs">{user.time}</span>
							</div>
						))}
					</div>
				</aside>
				<main className="flex-1 p-4 bg-gray-700">
					<div className="flex flex-col-reverse h-full">
						<div className="mb-4">
							<input
								type="text"
								className="w-full p-2 border rounded text-black focus:outline-none"
								placeholder="Type a message..."
							/>
						</div>
						<div className="flex-1 overflow-y-auto">
							{messages.map((message: any, index: any) => {
								const isCurrentUser = message.from === "user-1";
								return (
									<div
										key={index}
										className={`flex py-2 ${
											isCurrentUser ? "justify-end" : "justify-start"
										}`}>
										<div
											className={`rounded-lg p-3 shadow ${
												isCurrentUser
													? "bg-blue-500 text-white"
													: "bg-white text-gray-800"
											}`}>
											{message.type === "text" && <p>{message.content}</p>}
											{message.type === "image" && (
												<img
													src={message.content}
													alt="Sent image"
													className="max-h-40 w-auto"
												/>
											)}
											{message.type === "audio" && (
												<audio controls src={message.content}></audio>
											)}
											<p>{message.content}</p>
											<p className="text-xs mt-1">
												{new Date(message.timestamp).toLocaleTimeString()}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
