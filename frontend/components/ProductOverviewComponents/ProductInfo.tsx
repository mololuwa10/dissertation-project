import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "lucide-react";
import { fetchProductById } from "@/lib/dbModels";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
interface Product {
	productId: number;
	productName: string;
	productDescription: string;
	productPrice: number;
	productStockQuantity: number;
	imageUrls: string[];
	productDiscount: number;
	category: {
		categoryId: number;
		categoryName: string;
	};
	artisanProfile: {
		artisanId: number;
		firstname: string;
		lastname: string;
		bio: string;
		profilePicture: string;
		location: string;
		storeName: string;
	};
	dateTimeUpdated: string;
}

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function ProductInfo() {
	// const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	// const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

	const searchParams = useSearchParams();
	const productId = searchParams.get("productId");
	const [product, setProduct] = useState<Product | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		if (productId) {
			fetchProductById(Number(productId))
				.then((fetchedProduct) => {
					setProduct(fetchedProduct);
				})
				.catch((err: Error) => {
					console.error(err);
					setError("Failed to fetch product details");
				});
		}
	}, [productId]);

	return (
		<>
			<div className="w-full md:w-1/2 p-4">
				<h1 className="text-2xl font-bold">{product?.productName}</h1>
				<div className="text-xl font-semibold text-red-600">
					<span className="line-through text-gray-500">
						£{product?.productPrice}
					</span>{" "}
					£{product?.productDiscount}
				</div>
				{/* Reviews */}
				<div className="mt-6">
					<h3 className="sr-only">Reviews</h3>
					<div className="flex items-center">
						<div className="flex items-center">
							{[0, 1, 2, 3, 4].map((rating) => (
								<StarIcon
									key={rating}
									className={classNames(
										reviews.average > rating
											? "text-gray-900"
											: "text-gray-200",
										"h-5 w-5 flex-shrink-0"
									)}
									aria-hidden="true"
								/>
							))}
						</div>
						<p className="sr-only">{reviews.average} out of 5 stars</p>
					</div>
				</div>
				<div className="mt-4 text-xl font-semibold">
					{product?.productDescription}
				</div>
				{/* Style Selector */}
				{/* ... */}
				{/* Quantity Selector */}
				{/* ... */}
				<Button
					size="lg"
					className="w-full text-white py-3 rounded-3xl hover:bg-blue-600 mt-4">
					Add to cart
				</Button>
				<Button
					size="lg"
					className="w-full text-white py-3 rounded-3xl hover:bg-blue-600 mt-4">
					Buy Now
				</Button>
				<Button
					size="lg"
					className="w-full text-white py-3 rounded-3xl hover:bg-blue-600 mt-4">
					Add to Collection
				</Button>
				{/* ... Other product details and policies */}
				<div className="mt-6 space-y-6">
					<div className="text-lg font-medium text-gray-900">Item details</div>
					<ul className="space-y-4 text-sm text-gray-600">
						<li>Handmade</li>
						<li>Delivery from a small business in United Kingdom</li>
						<li>Materials: stained glass, cactus gravel, fusible glass</li>
					</ul>
					<p className="text-sm text-gray-600">
						The mushroom vase is an exquisite decorative piece that seamlessly
						blends nature-inspired aesthetics with the elegance of glass
						craftsmanship. It serves as a unique and eye-catching centerpiece,
						perfect for showcasing your favorite blooms and adding a touch of
						natural beauty to any space.
					</p>
					<p className="text-sm text-gray-600">
						Size: approximately 8-12 centimeters
					</p>
					<p className="text-sm text-gray-600">
						Please note: The color of the glass is difficult to capture and will
						vary in different lighting conditions; the color will also vary
						slightly on different displays.
					</p>
					<div className="text-lg font-medium text-gray-900">
						Delivery and return policies
					</div>
					<ul className="space-y-4 text-sm text-gray-600">
						<li>Order today to get by 19-24 Feb</li>
						<li>Returns & exchanges accepted within 7 days</li>
						<li>Free delivery</li>
					</ul>
					<div className="text-lg font-medium text-gray-900">
						Meet your sellers
					</div>
					<div className="text-sm text-gray-600">
						{product?.artisanProfile.firstname}
					</div>
					<div className="text-sm text-gray-600">
						Owner of {product?.artisanProfile.storeName}
					</div>
					<Button
						size="lg"
						className="w-full bg-gray-200 text-gray-900 py-2 rounded-3xl mt-4">
						Message {product?.artisanProfile.firstname}
					</Button>
				</div>
			</div>
		</>
	);
}
