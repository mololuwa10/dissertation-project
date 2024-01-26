"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export const words = [
	"a",
	"about",
	"all",
	"also",
	"and",
	"as",
	"at",
	"be",
	"because",
	"but",
	"by",
	"can",
	"come",
	"could",
	"will",
	"with",
	"would",
	"year",
	"you",
	"your",
];

export const cards = [
	{
		id: 1,
		title: "Total Users",
		number: 10.928,
		change: 12,
	},
	{
		id: 2,
		title: "Stock",
		number: 8.236,
		change: -2,
	},
	{
		id: 3,
		title: "Revenue",
		number: 6.642,
		change: 18,
	},
];

// Fetch user info thats logged in
export const useFetchUserInfo = () => {
	const [userDetails, setUserDetails] = useState(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const jwt = localStorage.getItem("jwt");

				if (!jwt) {
					setIsLoggedIn(false);
					return;
				}

				fetch("http://localhost:8080/api/user/info", {
					headers: { Authorization: "Bearer " + jwt },
				})
					.then((response) => {
						if (!response.ok) {
							setIsLoggedIn(false);
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then((data) => {
						setUserDetails(data.userDetails);
						setUserRole(data.userRole);
						setIsLoggedIn(true);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchUserInfo();
	}, []);

	return { userDetails, userRole, isLoggedIn };
};

export const checkLogin = () => {
	const jwt = localStorage.getItem("jwt");

	if (!jwt) {
		return false;
	} else {
		return true;
	}
};

export const useLogout = () => {
	const router = useRouter();
	const [userDetails, setUserDetails] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("jwt");
		setIsLoggedIn(false);
		setUserDetails(null);
		router.push("/login");
	};

	return handleLogout;
};
