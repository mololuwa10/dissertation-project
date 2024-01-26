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
