"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

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
					console.log(data);
					alert("Succesful Login");
					localStorage.setItem("jwt", data.jwt);
					router.push("/");
				} else {
					// Handle non-200 responses
					setError("Invalid credentials or server error.");
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

// Category Function
export const createCategory = async (formData: FormData, jwt: string) => {
	// The createCategory function now accepts FormData and the JWT token directly
	try {
		const response = await fetch("http://localhost:8080/api/categories", {
			// Ensure this is the correct endpoint
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			alert("Category Added Successfully");
			window.location.reload();
			return data;
		} else {
			const errorText = await response.text();
			throw new Error(`Failed to add category: ${errorText}`);
		}
	} catch (error) {
		console.error("Error adding category: ", error);
		throw error; // Throw the error to be handled by the calling component
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

// Users Function
