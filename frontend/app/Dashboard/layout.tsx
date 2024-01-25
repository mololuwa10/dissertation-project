import Sidebar from "@/components/dashboardComponents/sidebar/sidebar";
import styles from "@/components/dashboardComponents/dashboard.module.css";
import Navbar from "@/components/dashboardComponents/navbar/navbar";
import Footer from "@/components/dashboardComponents/footer/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
