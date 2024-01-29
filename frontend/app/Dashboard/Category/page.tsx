"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFetchCategories } from "@/lib/dbModels";

export default function Category() {
	interface Category {
		value: number;
		label: string;
		description: string;
		image: string;
	}

	// Fetch category data
	const { categories } = useFetchCategories() as { categories: Category[] };
	return (
		<Table>
			<TableCaption>Category List</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Category Id</TableHead>
					<TableHead>Category Name</TableHead>
					<TableHead>Category Description</TableHead>
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{categories.map((category) => (
					<>
						<TableRow key={category.value}>
							<TableCell>{category.value}</TableCell>
							<TableCell>{category.label}</TableCell>
							<TableCell>{category.description}</TableCell>
							<TableCell>
								<div className="p-2 flex">
									<Button
										size={"lg"}
										// variant={"outline"}
										className="mr-2 mb-2 flex">
										Edit
									</Button>
									<Button size={"lg"} className="hover:bg-gray-700">
										Delete
									</Button>
								</div>
							</TableCell>
						</TableRow>
					</>
				))}
			</TableBody>
		</Table>
	);
}
