"use client";

import { useFetchProducts } from "@/lib/dbModels";

export default function NewProduct() {
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
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
					<header className="text-center">
						<h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
							Explore New Products
						</h2>

						<nav className="mx-auto mt-4 max-w-md text-gray-500">
							<ul className="flex justify-between">
								<li>Technologies</li>
								<li>Vintage</li>
								<li>Jewellry</li>
								<li>Home & Living</li>
								<li>Jewellry</li>
							</ul>
						</nav>
					</header>

					<div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
						<div className="bg-blue-500 text-white rounded-lg overflow-hidden shadow-lg max-w-sm">
							<div className="p-5">
								<h2 className="text-lg font-semibold mb-2">
									Top 10 Best Sellers
								</h2>
								<button className="bg-yellow-300 text-blue-800 px-4 py-2 rounded hover:bg-yellow-400 transition-colors">
									Shop now →
								</button>
							</div>
							{/* <div className="bg-white p-5"> */}
							<img
								src="/landingPage.jpg"
								alt="Best Seller Sweater"
								className="w-full"
							/>
							{/* </div> */}
						</div>
						{products.map((product) => (
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
				</div>
			</div>
		</>
	);
}
