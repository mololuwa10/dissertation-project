"use client";

import { useFetchCategories } from "@/lib/dbModels";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";

export default function CategoriesComponents() {
	interface Category {
		value: number;
		label: string;
		description: string;
		image: string;
	}

	// Fetch category data
	const { categories } = useFetchCategories() as { categories: Category[] };
	return (
		<>
			<div className="">
				<div className="mx-auto sm:px-6 sm:py-16 lg:px-8 lg:max-w-[88rem]">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition duration-300">
							Shop Our Top Categories
						</h2>
						<Link
							className="text-lg font-medium tracking-tight text-gray-900 hover:text-blue-600 hover:underline"
							href="#">
							View All Categories
						</Link>
					</div>

					<div className="py-8">
						<Carousel
							opts={{
								align: "start",
							}}
							className="w-full p-4">
							<CarouselContent>
								{categories.map((category, index) => (
									<CarouselItem
										key={index}
										className="md:basis-1/2 lg:basis-1/3">
										<div className="group relative">
											<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
												<img
													src={
														category.image
															? `http://localhost:8080${category.image}`
															: "/blacktee.jpg"
													}
													alt={category.label}
													className="h-full w-full object-cover object-center lg:h-full lg:w-full"
												/>
											</div>
											<div className="mt-4 flex justify-between">
												<div>
													<h3 className="text-sm text-gray-700">
														<a href={"#"}>
															<span
																aria-hidden="true"
																className="absolute inset-0"
															/>
															{category.label}
														</a>
													</h3>
												</div>
											</div>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</div>
				</div>
			</div>
		</>
	);
}
