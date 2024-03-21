"use client";

import styles from "@/components/dashboardComponents/users/addUser/addUser.module.css";
import { useRef, useState } from "react";
import { addProduct } from "@/lib/auth";
import { useFetchAllCategories } from "@/lib/dbModels";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "@/app/LanguageContext";

const AddProductPage = () => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [productName, setProductName] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productStockQuantity, setProductStockQuantity] = useState("");
	const [productDiscount, setProductDiscount] = useState("");
	const [categoryId, setCategoryId] = useState<string | number | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	interface Category {
		value: number;
		label: string;
		description: string;
		image: string;
	}

	// Fetch category data
	const { categories } = useFetchAllCategories() as unknown as {
		categories: Category[];
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			!productName ||
			!productDescription ||
			!selectedImage ||
			!productPrice ||
			!productStockQuantity ||
			!categoryId
		) {
			setError("Please fill all fields and select an image.");
			return;
		}

		try {
			const jwt = localStorage.getItem("jwt");
			if (!jwt) {
				throw new Error("Authentication token not found.");
			}

			// const formData = new FormData();
			// formData.append(
			// 	"product",
			// 	JSON.stringify({
			// 		productName,
			// 		productDescription,
			// 		productPrice: parseFloat(productPrice),
			// 		productStockQuantity: parseInt(productStockQuantity),
			// 		categoryId: { categoryId },
			// 		productDiscount: parseFloat(productDiscount),
			// 	})
			// );
			// formData.append("image", selectedImage);

			const productData = {
				productName,
				productDescription,
				productPrice: parseFloat(productPrice),
				productStockQuantity: parseInt(productStockQuantity),
				category: { categoryId },
				productDiscount: parseFloat(productDiscount),
				images: [selectedImage], // TODO: Add multiple images support
			};

			setLoading(true);
			const response = await addProduct(
				productData,
				selectedImage ? [selectedImage] : [],
				jwt
			);
			toast.success("Product Added Successfully");
			console.log(response);
			setProductName("");
			setProductDescription("");
			setSelectedImage(null);
			setProductPrice("");
			setProductStockQuantity("");
			setCategoryId(null);
			setProductDiscount("");
		} catch (error) {
			setError(error instanceof Error ? error.message : String(error));
		} finally {
			setLoading(false);
		}
	};

	// Function to handle file selection
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedImage(event.target.files[0]);
		}
	};

	// Function to open file dialog
	const handleSelectImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<>
			<LanguageProvider>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<div className={styles.container}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Product Name"
							name="productName"
							value={productName}
							onChange={(event) => setProductName(event.target.value)}
							required
						/>
						<input
							type="text"
							placeholder="Product Price"
							name="productPrice"
							value={productPrice}
							onChange={(event) => {
								const validNumber = /^(\d+\.?\d{0,2}|\.\d{1,2})$/;
								if (validNumber.test(event.target.value)) {
									setProductPrice(event.target.value);
								}
							}}
							onBlur={(event) => {
								const value = parseFloat(event.target.value).toFixed(2);
								setProductPrice(value);
							}}
							required
						/>

						<input
							type="number"
							placeholder="Product Stock Quantity"
							name="productStockQuantity"
							value={productStockQuantity}
							onChange={(event) => setProductStockQuantity(event.target.value)}
							required
						/>
						<input
							type="number"
							placeholder="Product Discount"
							name="productDiscount"
							value={productDiscount}
							onChange={(event) => {
								const validNumber = /^(\d+\.?\d{0,2}|\.\d{1,2})$/;
								if (validNumber.test(event.target.value)) {
									setProductDiscount(event.target.value);
								}
							}}
							onBlur={(event) => {
								const value = parseFloat(event.target.value).toFixed(2);
								setProductDiscount(value);
							}}
						/>

						<select
							name="categoryId"
							id="categoryId"
							value={categoryId || ""}
							onChange={(event) => setCategoryId(event.target.value)}>
							<option value="" disabled selected>
								Select Category
							</option>
							{categories.map((category) => (
								<>
									<option key={category.value} value={category.value}>
										{category.label}
									</option>
								</>
							))}
						</select>

						<textarea
							name="description"
							id="productDescription"
							value={productDescription}
							onChange={(event) => setProductDescription(event.target.value)}
							placeholder="Product Description"></textarea>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleFileChange}
							style={{ display: "none" }}
						/>
						<button
							className="my-8"
							type="button"
							onClick={() => fileInputRef.current?.click()}>
							Select Image
						</button>

						<button type="submit" disabled={loading}>
							{loading ? "Submitting..." : "Submit"}
						</button>
					</form>
					{error && <p className="error">{error}</p>}
				</div>
			</LanguageProvider>
		</>
	);
};

export default AddProductPage;
