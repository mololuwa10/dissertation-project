import React from "react";
import ChatInterface from "./ChatInterface";

export const ChatBox = ({
	isOpen,
	onClose,
	artisanName,
	artisanStore,
}: {
	isOpen: any;
	onClose: any;
	artisanName: any;
	artisanStore: any;
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed bottom-10 right-4 w-[25rem] h-[30rem] p-4 bg-white border-black rounded-lg shadow-lg flex flex-col">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">
					{artisanName} from {artisanStore}
				</h2>
				<button onClick={onClose} className="self-end px-2 py-1 text-sm">
					Close
				</button>
			</div>
			<p className="text-sm text-gray-500">
				Typically responds within 48 hours
			</p>

			<ChatInterface />
		</div>
	);
};
