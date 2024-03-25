"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createArtisanProfile } from "@/lib/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useFetchUserInfo, useLogout } from "@/lib/data";
import { Button } from "../ui/button";
import { FormattedMessage } from "react-intl";

const ProfileButton = () => {
	const { isLoggedIn, userRole } = useFetchUserInfo();

	const logout = useLogout();

	const handleCreateArtisanProfile = async () => {
		try {
			const jwt = localStorage.getItem("jwt");
			if (!jwt) throw new Error("JWT not found");

			const profileData = await createArtisanProfile(jwt);
			toast.success("Artisan profile created successfully");
			console.log("Artisan profile created:", profileData);
		} catch (error) {
			console.error("Error creating artisan profile:", error);
			toast.error("Error creating artisan profile");
		}
	};

	if (!isLoggedIn) {
		return (
			<Link href="/SignIn">
				<Button size={"lg"}>
					<FormattedMessage id="navSignIn" defaultMessage="	Sign In" />
				</Button>
			</Link>
		);
	}

	return (
		<>
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
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt={`hello`} />
						<AvatarFallback>Loading</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>
						<FormattedMessage id="myAccount" defaultMessage="My Account" />
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer">
						<Link href={"/Profile"}>
							<FormattedMessage id="profile" defaultMessage="Profile" />
						</Link>
					</DropdownMenuItem>
					{isLoggedIn && userRole === "ADMIN" && (
						<DropdownMenuItem className="cursor-pointer">
							<Link href="/Dashboard">
								<FormattedMessage id="dashboard" defaultMessage="Dashboard" />
							</Link>
						</DropdownMenuItem>
					)}
					{isLoggedIn && userRole === "USER" && (
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={handleCreateArtisanProfile}>
							<FormattedMessage
								id="sellOnCraftCollaborations"
								defaultMessage="Sell on Craft Collaborations"
							/>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className="cursor-pointer">
						<FormattedMessage id="settings" defaultMessage="Settings" />
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer" onClick={logout}>
						<FormattedMessage id="logOut" defaultMessage="Log Out" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default ProfileButton;
