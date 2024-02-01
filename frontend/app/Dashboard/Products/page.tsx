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
import { useFetchProducts } from "@/lib/dbModels";

export default function Products() {
	interface Product {
		value: number;
		label: string;
		description: string;
		price: number;
		quantity: number;
		image: string;
		dateTimeUpdated: string;
		category: any;
		artisan: any;
	}

	// Fetch product data
	const { products } = useFetchProducts() as { products: Product[] };
	return (
		<>
			<Table>
				<TableCaption>Product List</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Product Id</TableHead>
						<TableHead>Product Name</TableHead>
						<TableHead>Product Description</TableHead>
						<TableHead>Product Price</TableHead>
						<TableHead>Product Quantity</TableHead>
						<TableHead>Product Date Updated</TableHead>
						<TableHead>Category Id</TableHead>
						<TableHead>Artisan Profile</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<>
							<TableRow key={product.value}>
								<TableCell>{product.value}</TableCell>
								<TableCell>{product.label}</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>{product.price}</TableCell>
								<TableCell>{product.quantity}</TableCell>
								<TableCell>{product.dateTimeUpdated}</TableCell>
								<TableCell>{product.category.categoryId}</TableCell>
								<TableCell>{product.artisan.artisanId}</TableCell>

								<TableCell>
									<div className="p-2 flex">
										<Button
											size={"lg"}
											// variant={"outline"}
											className="mr-2 mb-2 flex">
											Edit
										</Button>
										<Button
											size={"lg"}
											// variant={"outline"}
											className="mr-2 mb-2 flex">
											Delete
										</Button>
									</div>
								</TableCell>
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
		</>
	);
}
