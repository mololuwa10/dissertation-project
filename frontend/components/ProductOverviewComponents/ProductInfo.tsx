import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "lucide-react";
import { fetchProductById, fetchReviewsByProductId } from "@/lib/dbModels";
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

interface Review {
	reviewId: number;
	reviewTitle: string;
	rating: number;
	comment: string;
	applicationUser: {
		firstname: string;
		lastname: string;
	};
}

// const reviews = { href: "#", average: 4, totalCount: 117 };

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
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		fetchReviewsByProductId(productId)
			.then((reviews) => {
				setReviews(reviews);
			})
			.catch((error) => {
				console.error(error);
				setError("Failed to load reviews");
			});
	}, [productId]);

	const averageRating =
		reviews.length > 0
			? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
			: 0;

	// Function to render stars based on rating
	const renderStars = (rating: number | string) => {
		return (
			<div className="flex gap-0.5 text-green-500">
				{[...Array(5)].map((_, index) => (
					<svg
						key={index}
						className={`h-5 w-5 ${
							index < rating
								? "fill-current text-gray-900 flex-shrink-0"
								: "fill-current text-gray-400"
						}`}
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
				))}
			</div>
		);
	};

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
							{renderStars(parseFloat(averageRating.toFixed(1)))}
						</div>
						<a
							href={"#"}
							className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
							{`${reviews.length || 0} Reviews`}
						</a>
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
