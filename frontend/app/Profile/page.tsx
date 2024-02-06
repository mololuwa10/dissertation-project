"use client";

import Footer from "@/components/layoutComponents/Footer";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/layoutComponents/Header";
import { Button } from "@/components/ui/button";
import { useFetchUserInfo, useLogout } from "@/lib/data";
// import Link from "next/link";
import React from "react";
import PersonalInformationComponents from "@/components/ProfilePageComponents/PersonalInformationComponents";
import AccountSettingsComponents from "@/components/ProfilePageComponents/AccountSettingsComponents";
import StoriesGallerySkillsComponents from "@/components/ProfilePageComponents/StoriesGallerySkillsComponents";

const ProfilePage = () => {
	const router = useRouter();
	const { isLoggedIn, userRole, userDetails } = useFetchUserInfo();
	// useEffect(() => {
	// 	if (!isLoggedIn) {
	// 		router.push("/SignIn");
	// 	}
	// }, [isLoggedIn, router]);

	if (!isLoggedIn) {
		return <div>Unauthorized</div>;
	}
	return (
		<>
			<Header />
			<div className="bg-gray-100 min-h-screen">
				<div className="container mx-auto p-8">
					<div className="mb-10">
						<h1 className="text-3xl font-bold text-gray-800 mb-4">
							My Profile
						</h1>
						<p className="text-gray-600">
							Manage your personal information, account settings, and more.
						</p>
					</div>

					<PersonalInformationComponents />

					{/* <div className="bg-white shadow rounded-lg p-6 mb-6">
						<h2 className="text-2xl text-gray-800 font-semibold mb-4">
							Profile Picture
						</h2>
						<form>
						
							<Button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
								Upload
							</Button>
						</form>
					</div> */}

					<AccountSettingsComponents />

					<StoriesGallerySkillsComponents />
				</div>
			</div>

			<Footer />
		</>
	);
};

export default ProfilePage;
