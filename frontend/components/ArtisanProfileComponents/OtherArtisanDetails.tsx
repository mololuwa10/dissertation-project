import React from "react";

const OtherArtisanDetails = () => {
	const currentDate = new Date();
	const lastUpdatedDate = currentDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="container mx-auto px-4 py-2">
			<div className="flex justify-between items-start border-b-2 py-4">
				<div>
					<h1 className="text-2xl font-bold">Shop policies</h1>
					<p className="text-sm text-gray-600 mt-1">
						Last updated on {lastUpdatedDate}
					</p>
				</div>
				<div className="w-1/2 pl-10">
					{" "}
					{/* Adjust the width and padding as necessary */}
					<h2 className="text-xl font-semibold">Returns & exchanges</h2>
					<p className="text-sm text-gray-600 mt-1">
						See item details for return and exchange eligibility.
					</p>
				</div>
			</div>
		</div>
	);
};

export default OtherArtisanDetails;
