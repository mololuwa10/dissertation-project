"use client";
import Card from "@/components/dashboardComponents/card/card";
// import { cards } from "@/lib/data";
import styles from "@/components/dashboardComponents/dashboard.module.css";
import Chart from "@/components/dashboardComponents/chart/chart";
import ArtisanOrders from "@/components/dashboardComponents/artisanOrder/orders";
import { fetchOrdersByArtisan } from "@/lib/dbModels";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
	const [ordersData, setOrdersData] = useState({
		currentWeek: 0,
		previousWeek: 0,
		change: 0,
	});

	useEffect(() => {
		const fetchOrdersAndCalculate = async () => {
			const orders = await fetchOrdersByArtisan();
			const now = new Date();
			const startOfCurrentWeek = new Date(
				now.setDate(now.getDate() - now.getDay())
			);
			const startOfLastWeek = new Date(
				new Date(startOfCurrentWeek).setDate(startOfCurrentWeek.getDate() - 7)
			);

			const currentWeekOrders = orders.filter((order: any) => {
				const orderDate = new Date(order.order.orderDateTime);
				return orderDate >= startOfCurrentWeek;
			}).length;
			const previousWeekOrders = orders.filter((order: any) => {
				const orderDate = new Date(order.order.orderDateTime);
				return orderDate < startOfCurrentWeek && orderDate >= startOfLastWeek;
			}).length;

			const change =
				previousWeekOrders === 0
					? 100
					: parseFloat(
							(
								((currentWeekOrders - previousWeekOrders) /
									previousWeekOrders) *
								100
							).toFixed(2)
					  );

			setOrdersData({
				currentWeek: currentWeekOrders,
				previousWeek: previousWeekOrders,
				change,
			});
		};

		fetchOrdersAndCalculate();
	}, []);

	const cards = [
		{
			id: 1,
			title: "New Orders",
			number: ordersData.currentWeek,
			change: ordersData.change,
		},
		{
			id: 2,
			title: "Messages",
			number: 8,
			change: 2,
		},
		{
			id: 3,
			title: "Revenue",
			number: 6,
			change: 3,
		},
	];

	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<div className={styles.cards}>
					{cards.map((item) => (
						<Card item={item} key={item.id} />
					))}
				</div>
				<ArtisanOrders />
				<Chart />
			</div>
		</div>
	);
};

export default Dashboard;
