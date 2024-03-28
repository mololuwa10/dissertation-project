import React from "react";
import { Button } from "../ui/button";
import { PencilIcon } from "@heroicons/react/outline";
import Link from "next/link";

const ArtisanProfileHeader = () => {
	return (
		<>
			<div className="flex justify-between items-center px-4 py-2 bg-[#FDF0E8] border-b border-[#DEDEDE]">
				<button className="flex items-center text-sm px-6 py-3 bg-black rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
					<PencilIcon className="h-4 w-4 text-white mr-2" />

					<Link href={"/Profile/ArtisanProfile/Edit"}>
						{" "}
						<span className="text-white">Edit shop</span>
					</Link>
				</button>
				<div className="hidden sm:block">
					{" "}
					{/* Add any additional elements or placeholders for the right side of the header */}{" "}
				</div>
			</div>
		</>
	);
};

export default ArtisanProfileHeader;
