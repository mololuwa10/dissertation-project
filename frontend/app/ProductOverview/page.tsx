"use client";

import ImageGalleryComponents from "@/components/ProductOverviewComponents/ImageGalleryComponents";
import ProductInfo from "@/components/ProductOverviewComponents/ProductInfo";
import ProductReviews from "@/components/ProductOverviewComponents/ProductReviews";
import Footer from "@/components/layoutComponents/Footer";
import Header from "@/components/layoutComponents/Header";

export default function ProductOverview() {
	return (
		<>
			<Header />
			<div className="bg-white">
				<div className="pt-6">
					{/* <nav aria-label="Breadcrumb">
						<ol
							role="list"
							className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
							{product.breadcrumbs.map((breadcrumb) => (
								<li key={breadcrumb.id}>
									<div className="flex items-center">
										<a
											href={breadcrumb.href}
											className="mr-2 text-sm font-medium text-gray-900">
											{breadcrumb.name}
										</a>
										<svg
											width={16}
											height={20}
											viewBox="0 0 16 20"
											fill="currentColor"
											aria-hidden="true"
											className="h-5 w-4 text-gray-300">
											<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
										</svg>
									</div>
								</li>
							))}
							<li className="text-sm">
								<a
									href={product.href}
									aria-current="page"
									className="font-medium text-gray-500 hover:text-gray-600">
									{product.name}
								</a>
							</li>
						</ol>
					</nav> */}

					{/* Image gallery */}
					<ImageGalleryComponents />

					{/* Product info */}
					<ProductInfo />
				</div>

				{/* Reviews */}
				<ProductReviews />
			</div>

			<hr className=" mx-20 border-t-2 border-gray-600" />

			<Footer />
		</>
	);
}
