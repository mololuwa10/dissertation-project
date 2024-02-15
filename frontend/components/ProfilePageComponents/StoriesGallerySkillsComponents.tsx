/* eslint-disable @next/next/no-img-element */
import { Button } from "../ui/button";
import { useFetchUserInfo } from "@/lib/data";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StoriesGallerySkillsComponents() {
	const { isLoggedIn, userRole, userDetails } = useFetchUserInfo();
	if (!isLoggedIn || (userRole !== "ADMIN" && userRole !== "ARTISAN")) {
		return null;
	}
	return (
		<>
			<div className="bg-white shadow rounded-lg p-6 mb-6">
				<h2 className="text-2xl text-gray-800 font-semibold mb-4">Stories</h2>
				<form>
					<div className="mb-4">
						<label
							htmlFor="stories"
							className="block text-gray-700 text-sm font-bold mb-2">
							Story
						</label>
						<textarea
							id="stories"
							placeholder="Enter Your Story"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<Button className="mt-4 text-white px-6 py-2 rounded hover:bg-blue-600">
						Save
					</Button>
				</form>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-2xl text-gray-800 font-semibold mb-4">Gallery</h2>
					{/* Gallery images */}
					{/* ... */}
				</div>

				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-2xl text-gray-800 font-semibold mb-4">Skills</h2>
					<form>
						<textarea
							id="skills"
							placeholder="Enter your Skills"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						<Button
							size={"lg"}
							className="mt-4 text-white px-6 py-2 rounded hover:bg-blue-600">
							Save
						</Button>
					</form>
				</div>

				<Link href={"/ArtisanDashboard"}>
					<Button size={"lg"} className="hover:bg-blue-600">
						Go To Seller Dashboard
					</Button>
				</Link>
			</div>
		</>
	);
}
