/* eslint-disable @next/next/no-img-element */
import { LanguageProvider } from "@/app/LanguageContext";
import Footer from "@/components/layoutComponents/Footer";
import Header from "@/components/layoutComponents/Header";
import React from "react";

const SidebarItem = ({ title, count }: { title: any; count: any }) => {
	return (
		<a
			href="#"
			className="flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
			<span className="font-medium">{title}</span>
			{count > 0 && (
				<span className="text-xs font-semibold text-white bg-blue-500 rounded-full px-2 py-0.5">
					{count}
				</span>
			)}
		</a>
	);
};

const messages = [
	{
		id: 1,
		senderName: "Santina",
		senderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
		profileName: "SANTINAEmbroidery",
		messagePreview: "Hey, can I help?",
		timestamp: "Mar 05, 2024",
	},
	{
		id: 2,
		senderName: "Stitched Perfection",
		senderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
		profileName: "Stitchedperfectionuk",
		messagePreview: "Hello. How can I help you?",
		timestamp: "Mar 05, 2024",
	},
];

// Sample sidebar data
const sidebarItems = [
	{ title: "Inbox", count: 1 },
	// More items...
];

const MessageInbox = () => {
	return (
		<>
			<LanguageProvider>
				<Header />

				<div className="px-6 py-4 border-b border-gray-200">
					<div className="font-semibold text-xl">Messages</div>
					<input
						type="search"
						className="mt-2 p-2 w-full bg-gray-100 rounded-md"
						placeholder="Search your messages"
					/>
				</div>
				<div className="flex h-screen mb-8">
					{/* Sidebar */}
					<aside className="w-64 border-r">
						<div className="px-4 py-2">
							<div className="mt-4">
								{sidebarItems.map((item) => (
									<SidebarItem
										key={item.title}
										title={item.title}
										count={item.count}
									/>
								))}
							</div>
						</div>
					</aside>

					{/* Message list */}
					<main className="flex-1 overflow-y-auto">
						{messages.map((message) => (
							<li
								key={message.id}
								className="border-b last:border-b-0 border-gray-200">
								<a href="#" className="flex items-center p-4 hover:bg-gray-50">
									<img
										src={message.senderAvatar}
										alt={message.senderName}
										className="h-10 w-10 rounded-full"
									/>
									<div className="ml-4">
										<p className="text-sm font-medium">{message.senderName}</p>
										<p className="text-sm text-gray-600">
											{message.messagePreview}
										</p>
									</div>
									<div className="ml-auto">
										<p className="text-xs text-gray-500">{message.timestamp}</p>
									</div>
								</a>
							</li>
						))}
					</main>
				</div>
				<Footer />
			</LanguageProvider>
		</>
	);
};

export default MessageInbox;
