/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import or define your avatar component
import Header from "@/components/layoutComponents/Header";
import Footer from "@/components/layoutComponents/Footer";
import { LanguageProvider } from "@/app/LanguageContext";
import { Button } from "@/components/ui/button";

const ShopBanner = () => {
	return (
		<div className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<div className="flex items-center">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt={`hello`} />
						<AvatarFallback>Loading</AvatarFallback>
					</Avatar>
					<div className="ml-4">
						<h1 className="text-3xl font-bold text-gray-900">
							CustomiseUKStore
						</h1>
						<p className="text-gray-600">
							Customise your fashion, express your personality
						</p>
						<div className="flex items-center mt-2">
							<div className="flex space-x-1">
								{/* Stars will be dynamically rendered based on rating */}
								<span className="text-yellow-400">⭐</span>
								<span className="text-yellow-400">⭐</span>
								<span className="text-yellow-400">⭐</span>
								<span className="text-yellow-400">⭐</span>
								<span className="text-gray-300">⭐</span>
							</div>
							<span className="text-gray-600 ml-2">12,577 Sales</span>
						</div>
					</div>
				</div>
				<Button className="text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded-full">
					Follow shop
				</Button>
			</div>
		</div>
	);
};

const Announcement = () => {
	return (
		<div className="bg-gray-200 shadow-sm mt-4 p-4 text-gray-700">
			<h2 className="text-lg font-semibold">Announcement</h2>
			<p>Last updated on 26 Sep, 2023</p>
			<p>
				Are you in search of comfortable and chic clothing that exudes
				individuality? Look no further than CustomiseUKStore, your destination
				for meticulously hand-embroidered sweatshirts, hoodies, and tees.
			</p>
			{/* ... possibly include a 'Read more' link or button if content is longer */}
		</div>
	);
};

const ItemsHeader = () => {
	return (
		<>
			<Announcement />

			<div className="flex justify-between items-center border-b py-3">
				<div className="space-x-4 flex">
					<button className="font-semibold text-indigo-600">All</button>
					<button>On sale</button>
					<button>Hoodies & Sweatshirts</button>
					<button>Jacket</button>
					<button>T-Shirt</button>
					<button>Floral Shirts</button>
				</div>
				<div>
					<label htmlFor="search" className="sr-only">
						Search all 103 items
					</label>
					<input
						type="search"
						id="search"
						placeholder="Search all 103 items"
						className="border-gray-300 rounded"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-2 shadow rounded p-4 text-left align-start">
				<button className="font-semibold text-indigo-600 text-left w-full justify-start">
					All <span className="text-gray-500">103</span>
				</button>
				<button>
					On sale <span className="text-gray-500">103</span>
				</button>
				<button>
					Hoodies & Sweatshirts <span className="text-gray-500">72</span>
				</button>
				<button>
					Jacket <span className="text-gray-500">14</span>
				</button>
				<button>
					T-Shirt <span className="text-gray-500">1</span>
				</button>
				<button>
					Floral Shirts <span className="text-gray-500">4</span>
				</button>
				{/* ... other buttons ... */}
				<div className="pt-4">
					<Button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900">
						Contact shop owner
					</Button>
				</div>
			</div>
		</>
	);
};

const FeaturedItems = () => {
	// Assuming you have an array of featured items
	const featuredItems: any[] = [
		//...array of items
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
			{featuredItems.map((item) => (
				<div
					key={item.id}
					className="shadow rounded-lg p-4 flex flex-col items-center">
					<img src={item.image} alt={item.title} className="rounded-lg mb-2" />
					<h3 className="text-md font-semibold">{item.title}</h3>
					<p className="text-sm">{item.description}</p>
					{/* ... other item details */}
				</div>
			))}
		</div>
	);
};

const ShopPage = () => {
	return (
		<>
			<LanguageProvider>
				<Header />
				<div className="min-h-screen bg-gray-100">
					<ShopBanner />
					<div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-0">
						<ItemsHeader />
						<FeaturedItems />
						{/* ... possibly include other sections like Reviews, About, Shop Policies etc. */}
					</div>
					{/* ... include your footer here */}
				</div>
				<Footer />
			</LanguageProvider>
		</>
	);
};

export default ShopPage;