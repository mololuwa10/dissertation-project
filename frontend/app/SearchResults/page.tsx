"use client";

import Breadcrumb from "@/components/SearchResultComponents/Breadcrumb";
import FilterSidebar from "@/components/SearchResultComponents/FilterSidebar";
import ProductList from "@/components/SearchResultComponents/ProductList";
import Footer from "@/components/layoutComponents/Footer";
import Header from "@/components/layoutComponents/Header";
import { useFetchSearchedProducts } from "@/lib/dbModels";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchResults = () => {
	const searchParams = useSearchParams();
	const searchTerm = searchParams.get("query") ?? "";
	const filters = {
		minPrice: searchParams.get("minPrice") ?? "",
		maxPrice: searchParams.get("maxPrice") ?? "",
		minRating: searchParams.get("minRating") ?? "",
	};

	const { products } = useFetchSearchedProducts(searchTerm, filters);

	return (
		<div className="container mx-auto">
			<Header />
			<Breadcrumb title={`Result for "${searchTerm}"`} />
			<div className="flex my-6">
				<FilterSidebar />
				<ProductList products={products} />
			</div>
			<Footer />
		</div>
	);
};

export default SearchResults;
