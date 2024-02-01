"use client";

import { useFetchProducts } from "@/lib/dbModels";
import { Button } from "../ui/button";

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
