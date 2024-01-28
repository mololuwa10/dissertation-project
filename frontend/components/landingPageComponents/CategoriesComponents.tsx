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
];

export default function CategoriesComponents() {
	return (
		<>
			<div className="">
				<div className="mx-auto sm:px-6 sm:py-16 lg:px-8 lg:max-w-[88rem]">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Shop Our Top Categories
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-6 xl:gap-x-8">
						{products.map((product) => (
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
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
