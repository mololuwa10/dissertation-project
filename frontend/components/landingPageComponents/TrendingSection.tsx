"use client";

import { useFetchProducts } from "@/lib/dbModels";
import { Button } from "../ui/button";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";

// Convert fetching logic into a standalone async function
const fetchReviewsByProduct = async (productId: any) => {
	try {
		const response = await fetch(
			`http://localhost:8080/api/reviews/product/${productId}`
		);
		const data = await response.json();
		return data; // Returns the array of reviews
	} catch (error) {
		console.error("Error fetching reviews:", error);
		return []; // Return empty array in case of error
	}
};

export default function TrendingSections() {
	// Product function to fetch data from the database
	interface Product {
		value: number;
		label: string;
		description: string;
		price: number;
		quantity: number;
		image: string;
		category: {
			categoryId: number;
		};
		artisan: {
			artisanId: number;
		};
		dateTimeUpdated: string;
	}

	interface Review {
		reviewId: number;
		rating: number;
		comment: string;
		reviewDate: string;
		applicationUser: {
			userId: number;
			firstname: string;
			lastname: string;
			username: string;
		};
		products: {
			productId: number;
		};
	}

	const { products } = useFetchProducts() as { products: Product[] };
	const [reviewCounts, setReviewCounts] = useState<{ [key: number]: number }>(
		{}
	);

	const [averageRatings, setAverageRatings] = useState<{
		[key: number]: number;
	}>({});

	useEffect(() => {
		const fetchAndCountReviews = async () => {
			const counts: { [key: number]: number } = {};
			for (const product of products) {
				// Assume fetchReviewsByProduct correctly fetches reviews for a given product ID
				const reviews = await fetchReviewsByProduct(product.value);
				// Store the number of reviews instead of calculating an average
				counts[product.value] = reviews.length;
			}
			setReviewCounts(counts);
		};

		if (products.length > 0) {
			fetchAndCountReviews();
		}
	}, [products]);

	useEffect(() => {
		const calculateAndSetRatings = async () => {
			// Define the type of the ratings object
			const ratings: { [key: number]: number } = {};
			for (const product of products) {
				const reviews = await fetchReviewsByProduct(product.value);
				const averageRating =
					reviews.reduce((acc: any, curr: any) => acc + curr.rating, 0) /
					reviews.length;
				ratings[product.value] = isNaN(averageRating)
					? 0
					: Number(averageRating.toFixed(1)); // Check for NaN and round to 1 decimal
			}
			setAverageRatings(ratings);
		};

		if (products.length > 0) {
			calculateAndSetRatings();
		}
	}, [products]);

	return (
		<>
			<div className="mt-[-90px]">
				<div className="mx-auto sm:px-6 sm:py-16 lg:px-8 lg:max-w-[88rem]">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Customers also purchased
					</h2>

					<div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						{products.slice(0, 8).map((product) => (
							<div key={product.value} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={
											product.image
												? `http://localhost:8080${product.image}`
												: "/blacktee.jpg"
										}
										alt={product.label}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>

									<button className="absolute top-0 right-0 p-2">
										<svg
											className="w-6 h-6 text-gray-800"
											fill="none"
											stroke="currentColor">
											<Heart />
										</svg>
									</button>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href="#">
												<span aria-hidden="true" className="absolute inset-0" />
												{product.label}
											</a>
										</h3>
									</div>
									<p className="text-sm font-medium text-gray-900">
										£{product.price}
									</p>
								</div>
								<p className="text-gray-500 text-sm mt-2">
									{product.description}
								</p>
								<div className="mt-1 flex items-center">
									{[...Array(5)].map((_, index) => (
										<Star
											key={index}
											className={`h-5 w-5 ${
												index < averageRatings[product.value]
													? "text-yellow-500"
													: "text-gray-300"
											}`}
										/>
									))}
									<span className="ml-2">
										{reviewCounts[product.value] > 0
											? `(${reviewCounts[product.value]}) Reviews`
											: "No Reviews"}
									</span>
								</div>

								<button className="mt-4 text-sm px-4 py-2 rounded-2xl hover:bg-blue-700 transition-colors border-2">
									Add to Cart
								</button>
							</div>
						))}
					</div>
					<div>
						<Button
							size={"lg"}
							variant={"outline"}
							className="rounded-lg flex justify-center mt-4">
							View more
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
