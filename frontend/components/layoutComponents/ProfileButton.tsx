"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useFetchUserInfo, checkLogin, useLogout } from "@/lib/data";
import { Button } from "../ui/button";

const ProfileButton = () => {
	const { isLoggedIn, userRole } = useFetchUserInfo();
	const logout = useLogout();
	if (!isLoggedIn) {
		return (
			<Link href="/SignIn">
				<Button size={"lg"}>Sign In</Button>
			</Link>
		);
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt={`hello`} />
						<AvatarFallback>Loading</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer">
						<Link href={"/Profile"}>Profile</Link>
					</DropdownMenuItem>
					{isLoggedIn && userRole === "ADMIN" && (
						<DropdownMenuItem className="cursor-pointer">
							<Link href="/Dashboard">Dashboard</Link>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem className="cursor-pointer">
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer" onClick={logout}>
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default ProfileButton;
