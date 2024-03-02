import React, { useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatInterface = () => {
	const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
		[]
	);
	const [inputValue, setInputValue] = useState("");

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim() === "") return;
		setMessages([...messages, { text: inputValue, isUser: true }]);
		setInputValue("");
		// Here, you would also handle sending the message to your backend or chat service
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow overflow-auto p-4 flex flex-col space-y-4">
				{messages.map((msg, index) => (
					<ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
				))}
			</div>
			<form onSubmit={sendMessage} className="flex-shrink-0 border-t-2 p-4">
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
