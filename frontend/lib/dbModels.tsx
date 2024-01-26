"use client";

import React, { useState, useEffect, useCallback } from "react";

export const useFetchCategories = () => {
	interface Category {
		categoryId: number;
		categoryName: string;
		categoryDescription: string;
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
					checked: false,
				}));
				setCategories(formattedData);
			});
	}, []);

	return { categories };
};

export const useFetchProducts = () => {
	// Product function
	interface Product {
		productId: number;
		productName: string;
		productDescription: string;
		productPrice: number;
		productStockQuantity: number;
		productImage: string;
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
		fetch("http://localhost:8080/api/products")
			.then((response) => response.json())
			.then((data) => {
				const formattedData = data.map((product: Product) => ({
					value: product.productId,
					label: product.productName,
					description: product.productDescription,
					price: product.productPrice,
					quantity: product.productStockQuantity,
					image: product.productImage,
					dateTimeUpdated: product.dateTimeUpdated,
					category: product.category.categoryId,
					artisan: product.artisanProfile.artisanId,
					checked: false,
				}));
				console.log(formattedData);
				setProducts(formattedData);
			});
	}, []);

	return { products };
};

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
