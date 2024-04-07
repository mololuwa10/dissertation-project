"use client";

import Blog from "@/components/landingPageComponents/Blog";
import CategoriesComponents from "@/components/landingPageComponents/CategoriesComponents";
import CategoriesDeals from "@/components/landingPageComponents/CategoriesDeals";
import ImageCarousel from "@/components/landingPageComponents/ImageCarousel";
import NewProduct from "@/components/landingPageComponents/NewProduct";
import SellerStoreComponent from "@/components/landingPageComponents/SellerStoreComponent";
import TestimonialsComponents from "@/components/landingPageComponents/TestimonialsComponents";
import TrendingSections from "@/components/landingPageComponents/TrendingSection";
import Footer from "@/components/layoutComponents/Footer";
import Header from "@/components/layoutComponents/Header";
import Image from "next/image";
import { LanguageProvider } from "../app/LanguageContext";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ArtisanProfile, fetchNewArtisans } from "@/lib/dbModels";
import NewArtisanPopup from "@/components/landingPageComponents/NewArtisanPopup";
import { useRouter } from "next/navigation";

export default function Home({ Component, pageProps }: AppProps) {
	const [newArtisans, setNewArtisans] = useState<ArtisanProfile[]>([]);
	const [showPopup, setShowPopup] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const loadNewArtisans = async () => {
			try {
				const artisans = await fetchNewArtisans();
				setNewArtisans(artisans);
				if (artisans.length > 0) {
					setShowPopup(true);
					// Set a timeout to hide the popup after 10 seconds
					const timer = setTimeout(() => setShowPopup(false), 10000);
					return () => clearTimeout(timer);
				}
			} catch (error) {
				console.error("Failed to load new artisans:", error);
				// Handle the error appropriately in your UI
			}
		};

		loadNewArtisans();
	}, []);

	// Function to redirect to view all artisans and hide the popup
	const handleViewAllArtisans = () => {
		// Implement the redirect logic, e.g., using router.push('/path-to-all-artisans')
		router.push("/NewArtisans");
		setShowPopup(false);
	};

	// Function to close the popup
	const handleClosePopup = () => {
		setShowPopup(false);
	};

	return (
		<>
			<LanguageProvider>
				<main className="flex min-h-screen flex-col justify-between">
					<Header />

					<NewArtisanPopup
						count={newArtisans.length}
						onViewClick={handleViewAllArtisans}
						showPopup={showPopup}
						onClose={handleClosePopup}
					/>

					<ImageCarousel />

					<CategoriesDeals />

					<CategoriesComponents />

					<TrendingSections />

					<NewProduct />

					<SellerStoreComponent />

					<TestimonialsComponents />

					<Blog />
				</main>

				<Footer />
				{/* <Component {...pageProps} /> */}
			</LanguageProvider>
		</>
	);
}
