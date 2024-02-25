"use client";

import React, { useState, useEffect, useCallback, SetStateAction } from "react";
export const useFetchCategoryById = (categoryId: any) => {
	interface Category {
		categoryId: number;
		categoryName: string;
		categoryDescription: string;
		categoryImageUrl: string;
	}

	const [category, setCategory] = useState<Category | null>(null);

	useEffect(() => {
		if (!categoryId) return;

		fetch(`http://localhost:8080/api/categories/${categoryId}`)
			.then((response) => response.json())
			.then((data) => {
				const formattedData: Category = {
					categoryId: data.categoryId,
					categoryName: data.categoryName,
					categoryDescription: data.categoryDescription,
					categoryImageUrl: data.categoryImageUrl,
				};
				setCategory(formattedData);
				console.log(formattedData);
			})
			.catch((error) => {
				console.error("Error fetching category:", error);
			});
	}, [categoryId]);

	return { category };
};

// User Function
export const useFetchUsers = () => {
	// Define User interface
	interface User {
		userId: number;
		username: string;
		user_email: string;
		firstname: string;
		lastname: string;
		dateJoined: string | null;
		contactTelephone: string;
		contactAddress: string;
		authorities: {
			authority: string;
		}[];
	}

	const [users, setUsers] = useState<User[]>([]); // Use the User interface for state

	useEffect(() => {
		const jwt = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage

		// Ensure JWT token exists before making the request
		if (jwt) {
			fetch("http://localhost:8080/api/admin/allUsers", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwt}`, // Include the JWT token in the Authorization header
				},
			})
				.then((response) => {
					// Check for unauthorized response
					if (response.status === 401) {
						throw new Error("Unauthorized access. Please login.");
					}
					return response.json();
				})
				.then((data) => {
					const formattedData = data.map((user: User) => ({
						userId: user.userId,
						username: user.username,
						user_email: user.user_email,
						firstname: user.firstname,
						lastname: user.lastname,
						dateJoined: user.dateJoined,
						contactTelephone: user.contactTelephone,
						contactAddress: user.contactAddress,
						authorities: user.authorities
							.map((auth) => auth.authority)
							.join(", "),
						checked: false,
					}));
					setUsers(formattedData);
					console.log(formattedData);
				})
				.catch((error) => {
					console.error("Error fetching users:", error);
					// Handle errors, such as by setting an error state or notifying the user
				});
		} else {
			console.log(
				"JWT token not found. User must be logged in to access this data."
			);
			// Handle the case where there is no JWT token (e.g., user is not logged in)
		}
	}, []);

	return { users };
};

// get user by id
export async function fetchUserById(userId: any, jwt: string) {
	try {
		const response = await fetch(
			`http://localhost:8080/api/admin/user/${userId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			// Handle HTTP errors
			throw new Error(`Error fetching user: ${response.status}`);
		}

		// Assuming the response is JSON
		const user = await response.json();
		return user;
	} catch (error) {
		console.error("Fetching user failed:", error);
		throw error;
	}
}

export async function fetchAllRoles(jwt: string) {
	try {
		const response = await fetch("http://localhost:8080/api/admin/allRoles", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch roles");
		}

		const roles = await response.json();
		return roles;
	} catch (error) {
		console.error("Error fetching roles:", error);
		throw error;
	}
}

// Get all artisans
export async function fetchAllArtisans() {
	const response = await fetch("http://localhost:8080/api/user/allArtisans", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch artisans");
	}

	return response.json();
}
export const useFetchSearchedProducts = (
	searchTerm: string,
	filters: Record<string, any>
) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams();
		if (searchTerm) params.append("searchTerm", searchTerm);

		if (filters.categoryName)
			params.append("categoryName", filters.categoryName.toString());
		if (filters.storeName)
			params.append("storeName", filters.storeName.toString());
		if (filters.productPrice)
			params.append("productPrice", filters.productPrice.toString());
		if (filters.minPrice)
			params.append("minPrice", filters.minPrice.toString());
		if (filters.maxPrice)
			params.append("maxPrice", filters.maxPrice.toString());
		if (filters.location)
			params.append("location", filters.location.toString());

		const fetchProducts = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`http://localhost:8080/api/products/search?${params}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setProducts(data.content);
			} catch (error) {
				console.error("Error fetching products:", error);
				setError(error as SetStateAction<null>);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();

		// Use a cleanup function to avoid setting state on unmounted component
		return () => {
			setLoading(false);
			setError(null);
		};
	}, [
		filters.categoryName,
		filters.storeName,
		filters.location,
		filters.productPrice,
		filters.maxPrice,
		filters.minPrice,
		searchTerm,
	]);

	return { products, loading, error };
};

// Product function
export const useFetchProducts = (searchTerm: any) => {
	// Product function
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
		};
		artisanProfile: {
			artisanId: number;
		};
		dateTimeUpdated: string;
	}
	const [products, setProducts] = useState([]);
	// Fetch products with selected category filter
	useEffect(() => {
		const url = searchTerm
			? `http://localhost:8080/api/products?search=${encodeURIComponent(
					searchTerm
			  )}`
			: "http://localhost:8080/api/products";

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.map((product: Product) => ({
					value: product.productId,
					label: product.productName,
					description: product.productDescription,
					price: product.productPrice,
					quantity: product.productStockQuantity,
					image: product.imageUrls[0],
					dateTimeUpdated: product.dateTimeUpdated,
					discount: product.productDiscount,
					category: product.category,
					artisan: product.artisanProfile,
					checked: false,
				}));
				console.log(formattedData);
				setProducts(formattedData);
			});
	}, [searchTerm]);

	return { products };
};

// get product by id
export async function fetchProductById(productId: any) {
	try {
		const response = await fetch(
			`http://localhost:8080/api/products/${productId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error fetching product: ${response.status}`);
		}

		// Assuming the response is JSON
		const product = await response.json();
		console.log(product);
		return product;
	} catch (error) {
		console.error("Fetching product failed:", error);
		throw error;
	}
}

// get product by artisan id
export async function fetchProductsByArtisanId(artisanId: any) {
	try {
		const response = await fetch(
			`http://localhost:8080/api/products/artisan/${artisanId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Error fetching product By Artisan: ${response.status}`);
		}

		const products = await response.json();
		console.log(products);
		return products;
	} catch (err) {
		console.error("Fetching products failed:", err);
		throw err;
	}
}

// Get All categories
export const useFetchAllCategories = () => {
	interface Category {
		categoryId: number;
		categoryName: string;
		categoryDescription: string;
		categoryImageUrl: string;
	}
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		fetch("http://localhost:8080/api/categories/allCategories")
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.map((category: Category) => ({
					value: category.categoryId,
					label: category.categoryName,
					description: category.categoryDescription,
					image: category.categoryImageUrl,
					checked: false,
				}));
				setCategories(formattedData);
			});
	}, []);

	return { categories };
};

// Get Parent Categories
export const useFetchCategories = () => {
	interface Category {
		categoryId: number;
		categoryName: string;
		categoryDescription: string;
		categoryImageUrl: string;
	}
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8080/api/categories")
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.map((category: Category) => ({
					value: category.categoryId,
					label: category.categoryName,
					description: category.categoryDescription,
					image: category.categoryImageUrl,
					checked: false,
				}));
				setCategories(formattedData);
			});
	}, []);

	return { categories };
};

export const useFetchSubcategories = (categoryId: any) => {
	interface Category {
		categoryId: number;
		categoryName: string;
		categoryDescription: string;
		categoryImageUrl: string;
	}
	const [subcategories, setSubcategories] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:8080/api/categories/${categoryId}/subcategories`)
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.map((category: Category) => ({
					value: category.categoryId,
					label: category.categoryName,
					description: category.categoryDescription,
					image: category.categoryImageUrl,
					checked: false,
				}));
				setSubcategories(formattedData);
				console.log(formattedData);
			})
			.catch((error) => {
				console.error("Error fetching subcategories:", error);
			});
	}, [categoryId]); // Dependency array ensures the effect runs when categoryId changes

	return { subcategories };
};

// get all testimonials

export const useGetAllTestimonials = () => {
	interface Testimonials {
		testimonialId: number;
		testimonialTitle: string;
		rating: number;
		comment: string;
		testimonialDate: string;
		isApproved: boolean;
		applicationUser: {
			userId: number;
			firstname: string;
			lastname: string;
			username: string;
		};
	}
	const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/testimonials", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch testimonials");
				}

				const data = await response.json();
				setTestimonials(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching testimonials: ", error);
			}
		};

		fetchTestimonials();
	}, []);

	return { testimonials };
};
// Get all approved testimonials
export const useGetTestimonials = () => {
	interface Testimonials {
		testimonialId: number;
		testimonialTitle: string;
		rating: number;
		comment: string;
		reviewDate: string;
		testimonialDate: string;
		isApproved: boolean;
		applicationUser: {
			userId: number;
			firstname: string;
			lastname: string;
			username: string;
		};
	}
	const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch(
					"http://localhost:8080/api/testimonials/approvedTestimonials",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch testimonials");
				}

				const data = await response.json();
				setTestimonials(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching testimonials: ", error);
			}
		};

		fetchTestimonials();
	}, []);

	return { testimonials };
};

export const useGetMoreTestimonials = (page: any, pageSize: any) => {
	interface Testimonials {
		testimonialId: number;
		testimonialTitle: string;
		rating: number;
		comment: string;
		reviewDate: string;
		testimonialDate: string;
		isApproved: boolean;
		applicationUser: {
			userId: number;
			firstname: string;
			lastname: string;
			username: string;
		};
	}
	const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/testimonials/approvedTestimonials?page=${page}&pageSize=${pageSize}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch testimonials");
				}

				const data = await response.json();
				setTestimonials(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching testimonials: ", error);
			}
		};

		fetchTestimonials();
	}, [page, pageSize]);

	return { testimonials };
};

// Get all testimonials by Id
export const useGetTestimonialsById = (testimonialId: any) => {
	interface Testimonials {
		testimonialId: number;
		testimonialTitle: string;
		rating: number;
		comment: string;
		testimonialDate: string;
		isApproved: boolean;
		applicationUser: {
			userId: number;
			firstname: string;
			lastname: string;
			username: string;
		};
	}
	const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/testimonials/${testimonialId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				} else {
					const data = await response.json();
					setTestimonials(data);
					console.log(data);
				}
			} catch (error) {
				console.error("Error fetching testimonials: ", error);
			}
		};
		fetchTestimonials();
	}, [testimonialId]);

	return { testimonials };
};

// Get all Reviews by product
export async function fetchReviewsByProductId(productId: number | string) {
	try {
		const response = await fetch(
			`http://localhost:8080/api/reviews/product/${productId}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const reviews = await response.json();
		console.log(reviews);
		return reviews;
	} catch (error) {
		console.error("Failed to fetch reviews:", error);
		throw error;
	}
}

// Get all review by users
export async function fetchReviewsByUserId(userId: number | string) {
	try {
		const response = await fetch(
			`http://localhost:8080/api/reviews/user/${userId}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const userReviewData = await response.json();
		console.log(userReviewData);
		return userReviewData;
	} catch (error) {
		console.error("Failed to fetch reviews:", error);
		throw error;
	}
}

// Get Shopping Cart
export async function fetchShoppingCart(jwt: any) {
	const response = await fetch(
		"http://localhost:8080/api/shoppingCart/getCart",
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		}
	);

	console.log(response);

	if (!response.ok) {
		throw new Error("Failed to fetch shopping cart");
	}

	return response.json();
}

// Orders
// Get Orders
export async function fetchCurrentUserOrders() {
	const jwt = localStorage.getItem("jwt");
	const response = await fetch(
		"http://localhost:8080/api/orders/users/my-orders",
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	if (!response.ok) {
		// Handle the error case
		const message = await response.text();
		throw new Error(
			`HTTP error! status: ${response.status}, message: ${message}`
		);
	}

	return response.json();
}

// Get all orders
export async function fetchAllOrders() {
	const jwt = localStorage.getItem("jwt");
	const response = await fetch("http://localhost:8080/api/orders/all-orders", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${jwt}`,
		},
	});
	if (!response.ok) {
		// Handle the error case
		const message = await response.text();
		throw new Error(
			`HTTP error! status: ${response.status}, message: ${message}`
		);
	}

	return response.json();
}

// Get all orders by artisan
export async function fetchOrdersByArtisan() {
	const jwt = localStorage.getItem("jwt");

	try {
		const response = await fetch(
			`http://localhost:8080/api/orders/artisan/orders`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		if (!response.ok) {
			const message = await response.text();
			throw new Error(`Error: ${response.status}, Message: ${message}`);
		}

		const orders = await response.json();
		return orders;
	} catch (error) {
		console.error("Failed to fetch orders:", error);
		throw error;
	}
}
