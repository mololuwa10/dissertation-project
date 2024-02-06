"use client";

import Image from "next/image";
import styles from "./sidebar.module.css";
import {
	MdDashboard,
	MdSupervisedUserCircle,
	MdShoppingBag,
	MdWork,
	MdAnalytics,
	MdPeople,
	MdOutlineSettings,
	MdHelpCenter,
	MdLogout,
	MdCategory,
	MdReorder,
	MdContacts,
	MdEmail,
	MdSell,
	MdNotifications,
	MdMessage,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import { useFetchUserInfo } from "@/lib/data";

const menuItems = [
	{
		title: "Pages",
		list: [
			{
				title: "Artisan Dashboard",
				path: "/ArtisanDashboard",
				icon: <MdDashboard />,
			},
			{
				title: "Products",
				path: "/ArtisanDashboard/Products",
				icon: <MdShoppingBag />,
			},
			{
				title: "Sales",
				path: "/ArtisanDashboard/Sales",
				icon: <MdSell />,
			},
			{
				title: "Orders",
				path: "/ArtisanDashboard/Orders",
				icon: <MdReorder />,
			},
			{
				title: "Messages",
				path: "/ArtisanDashboard/Messages",
				icon: <MdMessage />,
			},
			{
				title: "Notifications",
				path: "/ArtisanDashboard/Notifications",
				icon: <MdNotifications />,
			},
		],
	},
	{
		title: "Analytics",
		list: [
			{
				title: "Revenue",
				path: "/ArtisanDashboard/revenue",
				icon: <MdWork />,
			},
			{
				title: "Reports",
				path: "/ArtisanDashboard/reports",
				icon: <MdAnalytics />,
			},
			{
				title: "Teams",
				path: "/ArtisanDashboard/teams",
				icon: <MdPeople />,
			},
		],
	},
	{
		title: "User",
		list: [
			{
				title: "Help",
				path: "/ArtisanDashboard/help",
				icon: <MdHelpCenter />,
			},
		],
	},
];

const ArtisanSidebar = () => {
	const { userDetails } = useFetchUserInfo();

	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<Image
					className={styles.userImage}
					src={"/noavatar.png"}
					alt=""
					width="50"
					height="50"
				/>
				<div className={styles.userDetail}>
					{userDetails && (
						<>
							<span className={styles.username}></span>
							<span className={styles.userTitle}>
								{userDetails.firstname} {userDetails.lastname}
							</span>
						</>
					)}
				</div>
			</div>
			<ul className={styles.list}>
				{menuItems.map((cat) => (
					<li key={cat.title}>
						<span className={styles.cat}>{cat.title}</span>
						{cat.list.map((item) => (
							<MenuLink item={item} key={item.title} />
						))}
					</li>
				))}
			</ul>
			<form>
				<button className={styles.logout}>
					<MdLogout />
					Logout
				</button>
			</form>
		</div>
	);
};

export default ArtisanSidebar;
