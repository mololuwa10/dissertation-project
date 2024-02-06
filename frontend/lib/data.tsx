"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// Fetch user info thats logged in
export const useFetchUserInfo = () => {
	const [userDetails, setUserDetails] = useState(null);
	const [userRole, setUserRole] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const fetchUserInfo = () => {
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
						// CHECKING IF THE USER LOGGED IN IS AN ADMIN
						const isAdmin = data.authorities.some(
							(authority: { roleId: number; authority: string }) =>
								authority.authority === "ADMIN"
						);

						const isArtisan = data.authorities.some(
							(authority: { roleId: number; authority: string }) =>
								authority.authority === "ARTISAN"
						);

						// Set the user details and role
						setUserDetails(data);
						if (isAdmin) {
							setUserRole("ADMIN");
						} else if (isArtisan) {
							setUserRole("ARTISAN");
						} else {
							setUserRole("USER");
						}
						setIsLoggedIn(true);
						console.log(data);
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
		router.push("/SignIn");
	};

	return handleLogout;
};
