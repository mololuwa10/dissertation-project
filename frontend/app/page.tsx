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

export default function Home() {
	return (
		<>
			<main className="flex min-h-screen flex-col justify-between">
				<Header />

				<ImageCarousel />

				<CategoriesDeals />

				<CategoriesComponents />

				<TrendingSections />

				<NewProduct />

				<SellerStoreComponent />

				<TestimonialsComponents />

				<Blog />
				<hr className=" mx-20 border-t-2 border-gray-600" />
			</main>

			<Footer />
		</>
	);
}
