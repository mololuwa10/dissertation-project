import Sidebar from "@/components/dashboardComponents/sidebar/sidebar";
import styles from "@/components/dashboardComponents/dashboard.module.css";
import Navbar from "@/components/dashboardComponents/navbar/navbar";
import Footer from "@/components/dashboardComponents/footer/footer";
import { useFetchUserInfo } from "@/lib/data";

const Layout = ({ children }: { children: React.ReactNode }) => {
	// const { isLoggedIn, userRole } = useFetchUserInfo();
	// if (!isLoggedIn || userRole !== "ADMIN") {
	// 	return <div>You are not authorized to view this page</div>;
	// }
	return (
		<div
			className={styles.container}
			style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
			<div className={styles.menu}>
				<Sidebar />
			</div>
			<div className={styles.content}>
				<Navbar />
				{children}
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
