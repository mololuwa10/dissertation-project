/* eslint-disable @next/next/no-img-element */
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

interface Order {
	id: string;
	totalPrice: number;
	status: string;
	orderDateTime: string;
	quantity: string;
	user: {
		firstname: string;
		lastname: string;
		user_email: string;
		phone: string;
		contactAddress: string;
		contactTelephone: string;
	};

	items: Array<{
		productDTO: {
			productName: string;
			imageUrls: string[];
		};
		quantity: number;
		priceAtOrder: number;
	}>;
}

function formatDate(dateString: any) {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const date = new Date(dateString);
	let formattedDate = date.toLocaleDateString("en-GB", options);

	// Find the day number and append the appropriate suffix
	const day = date.getDate();
	const suffix = ["th", "st", "nd", "rd"][
		day % 10 > 3 ? 0 : (day % 100) - (day % 10) != 10 ? day % 10 : 0
	];

	// Replace the day number with the day number + suffix
	formattedDate = formattedDate.replace(/\d+/, `${day}${suffix}`);

	return formattedDate;
}

const OrderCard = ({ order }: { order: Order }) => {
	// Call the formatDate function before rendering
	const formattedDate = formatDate(order.orderDateTime);
	return (
		<>
			<div className="border rounded-lg shadow-sm mb-5 p-4 bg-white">
				<div className="flex justify-between items-start">
					<div className="flex-1">
						<div className="flex justify-between">
							<div>
								<p className="text-sm text-gray-600">
									ORDER PLACED # {order.id}
								</p>
								<p className="text-lg">{formattedDate}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">TOTAL</p>
								<p className="text-lg">£{order.totalPrice.toFixed(2)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-600">DISPATCH TO</p>
								<p className="text-lg">
									{
										<NavigationMenu>
											<NavigationMenuList>
												<NavigationMenuItem>
													<NavigationMenuTrigger>
														{order.user.firstname} {order.user.lastname}
													</NavigationMenuTrigger>
													<NavigationMenuContent>
														{order.user.firstname} {order.user.contactAddress}
													</NavigationMenuContent>
												</NavigationMenuItem>
											</NavigationMenuList>
										</NavigationMenu>
									}
								</p>
							</div>
						</div>
						<div className="mt-4">
							<p className="text-green-600">{order.status}</p>
							{/* <p className="text-lg">{order.deliveryRange}</p> */}
							<p className="text-lg font-bold">
								{order.items[0].productDTO.productName}
							</p>
							<div className="flex gap-3 mt-2">
								<button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
									Buy again
								</button>
								<button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
									View Order Details
								</button>
								<button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
									Return or replace items
								</button>
								<button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
									Write a product review
								</button>
								<button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
									Leave Seller feedback
								</button>
							</div>
							{/* ... other buttons */}
						</div>
					</div>
					<div className="flex-none ml-4">
						<img
							src={`http://localhost:8080${order.items[0].productDTO.imageUrls[0]}`}
							alt={order.items[0].productDTO.productName}
							className="w-32 h-44 object-cover rounded-md"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderCard;
