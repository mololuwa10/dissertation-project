import Card from "@/components/dashboardComponents/card/card";
// import { cards } from "@/lib/data";
import styles from "@/components/dashboardComponents/dashboard.module.css";
import Chart from "@/components/dashboardComponents/chart/chart";
import ArtisanOrders from "@/components/dashboardComponents/artisanOrder/orders";

const cards = [
	{
		id: 1,
		title: "New Orders",
		number: 10,
		change: 9,
	},
	{
		id: 2,
		title: "Messages",
		number: 8,
		change: 2,
	},
	{
		id: 3,
		title: "Notifications",
		number: 6,
		change: 3,
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
				<ArtisanOrders />
				<Chart />
			</div>
		</div>
	);
};

export default Dashboard;
