import Card from "@/components/dashboardComponents/card/card";
import { cards } from "@/lib/data";
import styles from "@/components/dashboardComponents/dashboard.module.css";
import Chart from "@/components/dashboardComponents/chart/chart";
import Transactions from "@/components/dashboardComponents/transactions/transactions";

const Dashboard = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<div className={styles.cards}>
					{/* {cards.map((item) => (
						<Card item={item} key={item.id} />
					))} */}
				</div>
				<Transactions />
				<Chart />
			</div>
		</div>
	);
};

export default Dashboard;
