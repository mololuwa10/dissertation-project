import Card from "@/components/dashboardComponents/card/card";
// import { cards } from "@/lib/data";
import styles from "@/components/dashboardComponents/dashboard.module.css";
import Chart from "@/components/dashboardComponents/chart/chart";
import Orders from "@/components/dashboardComponents/orders/orders";

const cards = [
	{
		id: 1,
		title: "Total Users",
		number: 10.928,
		change: 12,
	},
	{
		id: 2,
		title: "Stock",
		number: 8.236,
		change: -2,
	},
	{
		id: 3,
		title: "Revenue",
		number: 6.642,
		change: 18,
	},
];

const Dashboard = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<div className={styles.cards}>
					{cards.map((item) => (
						<Card item={item} key={item.id} />
					))}
				</div>
				<Orders />
				<Chart />
			</div>
		</div>
	);
};

export default Dashboard;
