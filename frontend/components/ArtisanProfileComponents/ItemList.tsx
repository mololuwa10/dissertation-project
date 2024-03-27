"use client";

import { SearchIcon } from "@heroicons/react/outline";
import { MailOpen } from "lucide-react";
import React, { useState, useEffect } from "react";
import { fetchProductsByArtisanId } from "@/lib/dbModels";
import { useFetchUserInfo } from "@/lib/data";

const ItemList = () => {
	const [artisanProducts, setArtisanProducts] = useState([]);
	const { userDetails } = useFetchUserInfo();

	const artisanId = userDetails?.artisanProfile?.artisanId ?? "";

	useEffect(() => {
		const fetchAndSetProducts = async () => {
			try {
				const products = await fetchProductsByArtisanId(artisanId);
				setArtisanProducts(products);
			} catch (error) {
				console.error("Failed to fetch products:", error);
			}
		};

		fetchAndSetProducts();
	}, [artisanId]);

	return (
		<>
			<div className="text-xl font-bold p-4 mx-8 mt-4">Items</div>
			{/* Search Bar */}
			<div className="flex justify-between items-center p-4 mx-8">
				<div className="relative">
					<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						className="pl-10 p-2 border border-gray-300 rounded-full"
						placeholder="Search items"
					/>
				</div>
				<div className="self-end">
					<label htmlFor="sort" className="text-sm font-medium mr-2">
						Sort:
					</label>
					<select id="sort" className="border border-gray-300 rounded">
						<option>Most Recent</option>
						{/* Include other sorting options here */}
					</select>
				</div>
			</div>
			<div className="flex justify-between p-4 mx-8 mb-10">
				{/* Left column for search and stats */}
				<div className="flex flex-col w-1/2 space-y-8">
					{/* Item stats */}
					<div className="space-y-8">
						<div className="flex items-center space-x-1">
							<span className="font-medium">All</span>
							<span className="font-bold">0</span>
						</div>
						<button className="flex items-center px-4 py-2 text-sm font-medium border-2 border-gray-700 rounded-full shadow">
							<MailOpen className="mr-2 -ml-1 w-4 h-4" />
							Contact shop owner
						</button>
						<div className="flex items-center space-x-1">
							<span className="font-medium">0 Sales</span>
						</div>
						<div className="flex items-center space-x-1">
							<span className="font-medium">0 Admirers</span>
						</div>
					</div>
				</div>
				{/* Right column for image and sorting */}
				<div className="flex items-center justify-start w-1/2">
					<div className="text-gray-400 mb-8">
						<svg
							className="w-32 h-32 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-1m0-8h1m-1 1h-1m4 0h.01M12 12h1v1m0 4h-1m1-5h1m-4 0H8m0 0H7m0 0v1m0-1v-1m0 6h1m-1 0H7m0 0v1m0-1v-1"
							/>
						</svg>
						<p className="text-lg">No items listed at this time</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItemList;
