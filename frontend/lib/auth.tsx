"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { format } from "path";

export const useLogin = () => {
	const router = useRouter();
	const [error, setError] = useState("");

	const login = useCallback(
		async (username: string, password: string) => {
			try {
				const response = await fetch("http://localhost:8080/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				});

				if (response.status === 200) {
					const data = await response.json();
					localStorage.setItem("jwt", data.jwt);
					console.log(data);
					alert("Successful Login");
					router.push("/");
				} else if (response.status === 401) {
					// Handle invalid credentials
					setError("Invalid username or password.");
				} else {
					// Handle other non-200 responses
					setError("An error occurred during login.");
					console.error("Login failed: ", response.statusText);
				}
			} catch (error) {
				console.error("Login error: ", error);
				setError("An error occurred during login.");
			}
		},
		[router]
	);

	return { login, error };
};

// Category Function------------------------------------
export const createCategoryOrSubcategory = async (
	formData: FormData,
	jwt: string,
	parentId?: number | string
) => {
	try {
		let url = "http://localhost:8080/api/categories";
		if (parentId !== undefined) {
			url += `/${parentId}/subcategories`; // Appending the parentId for subcategory creation
		}

		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			alert(
				parentId
					? "Subcategory Added Successfully"
					: "Category Added Successfully"
			);
			window.location.reload();
			return data;
		} else {
			const errorText = await response.text();
			throw new Error(
				`Failed to add ${parentId ? "subcategory" : "category"}: ${errorText}`
			);
		}
	} catch (error) {
		console.error(
			`Error adding ${parentId ? "subcategory" : "category"}: `,
			error
		);
		throw error;
	}
};

export const deleteCategory = async (categoryId: number, jwt: string) => {
	try {
		const response = await fetch(
			`http://localhost:8080/api/categories/${categoryId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		if (!response.ok) throw new Error("Could not delete category");
	} catch (err) {
		console.error("Error deleting category: ", err);
		throw err;
	}
};
// -------------------------------------

// Users Function
export const registerUser = async (userData: any) => {
	try {
		const response = await fetch("http://localhost:8080/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("jwt", data.jwt); // Handle JWT securely
			alert("User Registered Successfully");
			return data;
		} else {
			// Handle non-OK responses
			let errorMessage = `Error during registration: ${response.status}`;
			if (response.headers.get("Content-Type")?.includes("application/json")) {
				const errorData = await response.json();
				errorMessage = errorData.message || errorMessage;
			}
			throw new Error(errorMessage);
		}
	} catch (error) {
		console.error("There was an error registering the user:", error);
		throw error; // Rethrow the error to be handled by the caller
	}
};

// Update User
export const updateUser = async (
	userId: number,
	userData: any,
	jwt: string
) => {
	try {
		const url = `http://localhost:8080/api/admin/updateUser/${userId}`;
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			alert("User Updated Successfully");
			return data;
		} else {
			const errorText = await response.text();
			throw new Error(`Failed to update user: ${errorText}`);
		}
	} catch (error) {
		console.error("Error updating user: ", error);
		throw error;
	}
};

// Product Function---------------------------------------------------------------------------------------------------------
// Add Product
export const addProduct = async (
	productData: any,
	images: File[],
	jwt: string
) => {
	try {
		const url = "http://localhost:8080/api/products";
		const formData = new FormData();
		formData.append("product", JSON.stringify(productData));

		images.forEach((image) => {
			formData.append("images", image);
		});

		const response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + jwt,
			},
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			alert("Product Added Successfully");
			window.location.reload();
			return data;
		} else {
			const errorText = await response.text();
			throw new Error(`Failed to add product: ${errorText}`);
		}
	} catch (error) {
		console.error("Error adding product: ", error);
		throw error;
	}
};

// Delete Product
export const deleteProduct = async (productId: number, jwt: string) => {
	try {
		const response = await fetch(
			`http://localhost:8080/api/products/${productId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		if (!response.ok) throw new Error("Could not delete product");
	} catch (err) {
		console.error("Error deleting product: ", err);
		throw err;
	}
};

// Update Product
export const updateProduct = async (
	productId: number,
	productData: any,
	jwt: string
) => {
	try {
		const url = `http://localhost:8080/api/products/${productId}`;
		const formData = new FormData();
		formData.append("product", JSON.stringify(productData));

		// images.forEach((image) => {
		// 	formData.append("images", image);
		// });

		const response = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			alert("Product Updated Successfully");
			return data;
		} else {
			const errorText = await response.text();
			throw new Error(`Failed to update product: ${errorText}`);
		}
	} catch (error) {
		console.error("Error updating product: ", error);
		throw error;
	}
};
