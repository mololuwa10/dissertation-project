import Blog from "@/components/landingPageComponents/Blog";
import CategoriesComponents from "@/components/landingPageComponents/CategoriesComponents";
import ImageCarousel from "@/components/landingPageComponents/ImageCarousel";
import SellerStoreComponent from "@/components/landingPageComponents/SellerStoreComponent";
import TrendingSections from "@/components/landingPageComponents/TrendingSection";
import Footer from "@/components/layoutComponents/Footer";
import Header from "@/components/layoutComponents/Header";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<main className="flex min-h-screen flex-col justify-between">
				<Header />

				<ImageCarousel />

				<CategoriesComponents />

				<TrendingSections />

				<SellerStoreComponent />

				<Blog />
				<hr className=" mx-20 border-t-2 border-gray-600" />
			</main>

			<Footer />
		</>
	);
}
