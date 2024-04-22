/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { TopArtisanProfile } from "@/lib/dbModels";
import NewArtisans from "@/app/NewArtisans/page";
import NewArtisansGrid from "../NewArtisanComponents/NewArtisanGrid";
import ArtisanCard from "../NewArtisanComponents/ArtisanCard";
import TopSellerComponents from "./TopSellerComponent";

// Fetching top artisans asynchronously
const fetchTopArtisans = async () => {
	try {
		const response = await fetch(
			"http://localhost:8080/api/sales/top-artisans"
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching top artisans:", error);
		throw error;
	}
};

export default function SellerStoreComponent() {
	const [topArtisans, setTopArtisans] = useState<TopArtisanProfile[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		fetchTopArtisans().then(
			(artisans) => {
				setTopArtisans(artisans);
				setIsLoading(false);
			},
			(error) => {
				setError(error.message);
				setIsLoading(false);
			}
		);
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<div className="mt-[-90px]">
				<div className="mx-auto sm:px-6 sm:py-16 lg:px-8 lg:max-w-[88rem]">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Best Selling Store
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{/* {products.map((product) => (
							<div key={product.id} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={product.imageSrc}
										alt={product.imageAlt}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={product.href}>
												<span aria-hidden="true" className="absolute inset-0" />
												{product.name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{product.color}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										{product.price}
									</p>
								</div>
							</div>
						))} */}
						{topArtisans.map((artisan, index) => (
							<TopSellerComponents key={index} artisan={artisan} />
						))}
						{/* <NewArtisansGrid artisans={topArtisans} /> */}
					</div>
				</div>
			</div>
		</>
	);
}
