"use client";

import { useFetchUserInfo } from "@/lib/data";
import { MessageSquareMore } from "lucide-react";
import React from "react";

export default function ShopInfo() {
	const { isLoggedIn, userDetails, userRole } = useFetchUserInfo();

	if (!userDetails) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{userDetails && (
				<div className="flex justify-between items-center p-4 mx-[1.5rem] my-[1.5rem]">
					{/* Shop image and name */}
					<div className="flex items-center space-x-4">
						<div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
							{/* Include img tag here if you have a shop image */}
						</div>
						<div className="flex flex-col">
							<h2 className="text-2xl font-semibold">
								{userDetails?.artisanProfile?.storeName}
							</h2>
							<button className="text-sm px-4 py-2 mt-2 bg-black text-white rounded-full hover:bg-gray-900">
								Follow shop
							</button>
						</div>
					</div>

					{/* Shop owner and contact */}
					<div className="flex items-center space-x-2">
						<div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
							{/* Include img tag here if you have an owner image */}
						</div>
						<div className="flex flex-col items-end">
							<p className="text-lg font-semibold">
								{userDetails.user.firstname}
							</p>
							<button className="flex items-center text-blue-600 hover:underline text-sm">
								<MessageSquareMore className="h-4 w-4 mr-1" />
								Contact
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
