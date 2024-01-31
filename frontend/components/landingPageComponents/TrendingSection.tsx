"use client";

import { useFetchProducts } from "@/lib/dbModels";

const products = [
	{
		id: 1,
		name: "Basic Tee",
		href: "#",
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	// More products...
];

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

	const { products } = useFetchProducts() as { products: Product[] };

	return (
		<>
			<div className="mt-[-90px]">
				<div className="mx-auto sm:px-6 sm:py-16 lg:px-8 lg:max-w-[88rem]">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Customers also purchased
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<div key={product.value} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={
											product.image // Use the `image` property here
												? `http://localhost:8080${product.image}` // Ensure your server is correctly configured to serve this image
												: "/blacktee.jpg" // Fallback image
										}
										alt={product.label}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
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
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
