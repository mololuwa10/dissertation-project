import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import {
	connect,
	sendMessage,
	disconnect,
	isConnected,
} from "@/lib/WebSocketService";

const ChatInterface = ({ artisanId }: { artisanId: any }) => {
	const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
		[]
	);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const onMessageReceived = (msg: any) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
		};

		connect(artisanId, onMessageReceived);

		return () => {
			// Disconnect or clean up WebSocket connection when component unmounts
			disconnect();
		};
	}, [artisanId]);

	const handleSendMessage = (e: any) => {
		e.preventDefault();
		const messageContent = {
			// Structure this based on your ChatMessage model
			sender: "Username", // You need to replace this with actual sender info
			content: inputValue, // Assuming inputValue is your message input state
			recipientId: artisanId,
		};
		sendMessage(messageContent);
		setMessages((prevMessages) => [
			...prevMessages,
			{ text: messageContent.content, isUser: true },
		]); // Optionally, add message to local state
		setInputValue(""); // Assuming you have an inputValue state for the input field
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow overflow-auto p-4 flex flex-col space-y-4">
				{messages.map((msg, index) => (
					<ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
				))}
			</div>
			<form
				onSubmit={handleSendMessage}
				className="flex-shrink-0 border-t-2 p-4">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Type your message here..."
					className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
				/>
			</form>
		</div>
	);
};

export default ChatInterface;
