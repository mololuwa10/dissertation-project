import React from "react";

const HeaderTabs = () => {
	return (
		<div className="flex border-b">
			<a
				href="#orders"
				className="text-sm font-medium text-gray-500 px-4 py-2 hover:bg-gray-100">
				Orders
			</a>
			<a
				href="#orders"
				className="text-sm font-medium text-gray-500 px-4 py-2 hover:bg-gray-100">
				Cancelled Orders
			</a>
			<a
				href="#orders"
				className="text-sm font-medium text-gray-500 px-4 py-2 hover:bg-gray-100">
				Buy Again
			</a>
		</div>
	);
};

export default HeaderTabs;
