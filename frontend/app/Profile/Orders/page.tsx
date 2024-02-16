"use client";
import HeaderTabs from "@/components/ProfilePageComponents/OrderPageComponents/HeaderTabs";
import React, { useCallback, useEffect, useState } from "react";
import OrderCard from "@/components/ProfilePageComponents/OrderPageComponents/OrderCard";
import Header from "@/components/layoutComponents/Header";
import Footer from "@/components/layoutComponents/Footer";
import { fetchCurrentUserOrders } from "@/lib/dbModels";
import { FaSearch } from "react-icons/fa";

const Orders = () => {
	// State for the search query
	const [searchQuery, setSearchQuery] = useState("");
	interface Order {
		id: string;
		totalPrice: number;
		status: string;
		orderDateTime: string;
		quantity: string;
		user: {
			firstname: string;
			lastname: string;
			user_email: string;
			phone: string;
			contactAddress: string;
			contactTelephone: string;
		};

		items: Array<{
			productDTO: {
				productName: string;
				imageUrls: string[];
			};
			quantity: number;
			priceAtOrder: number;
		}>;
	}

	const [allOrders, setAllOrders] = useState<Order[]>([]);
	const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchCurrentUserOrders()
			.then((data) => {
				setAllOrders(data);
				setFilteredOrders(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	// Function to filter orders based on the search query
	const filterOrders = useCallback(
		(query: string) => {
			if (!query) {
				// If the search query is empty, show all orders
				setFilteredOrders(allOrders);
			} else {
				// Filter orders that match the search query
				const lowercasedQuery = query.toLowerCase();
				const filtered = allOrders.filter((order) => {
					return order.items.some((item) =>
						item.productDTO.productName.toLowerCase().includes(lowercasedQuery)
					);
				});
				setFilteredOrders(filtered);
			}
		},
		[allOrders]
	);

	// Update the filtered orders whenever the search query changes
	useEffect(() => {
		filterOrders(searchQuery);
	}, [searchQuery, allOrders, filterOrders]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	// Function to handle search input changes
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	return (
		<>
			<Header />
			<div className="bg-white">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center my-3">
						<h1 className="text-2xl font-bold leading-tight text-gray-900">
							Your Orders
						</h1>
						<div className="relative">
							<input
								type="text"
								className="h-10 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none border-2"
								placeholder="Search orders..."
								value={searchQuery}
								onChange={handleSearchChange}
							/>
							<div className="absolute top-2 left-3">
								<i className="fa fa-search hover:text-gray-500">
									<FaSearch />
								</i>
							</div>
							<div className="absolute top-2 right-2">
								<button
									className="h-6 w-20 text-white rounded-lg bg-gray-800 hover:bg-gray-900"
									onClick={() => {
										/* Add search functionality here */
									}}>
									Search
								</button>
							</div>
						</div>
					</div>
					<HeaderTabs />
					<div className="mt-8">
						{filteredOrders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Orders;
