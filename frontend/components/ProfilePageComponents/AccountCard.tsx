import Link from "next/link";
import React from "react";
import { IconContext } from "react-icons";
import {
	FaRegAddressCard,
	FaRegListAlt,
	FaLock,
	FaRegCreditCard,
	FaTools,
	FaEnvelope,
	FaStar,
	FaHeadset,
	FaCertificate,
} from "react-icons/fa";

type IconMappingType = {
	[key: string]: JSX.Element; // Index signature
};

const iconMapping: IconMappingType = {
	"Your Orders": <FaRegListAlt size="3em" className="mb-2" />,
	"Your Addresses": <FaRegAddressCard size="3em" className="mb-2" />,
	"Login & Security": <FaLock size="3em" className="mb-2" />,
	"Your Payments": <FaRegCreditCard size="3em" className="mb-2" />,
	"Artisan Profile": <FaTools size="3em" className="mb-2" />,
	"Your Messages": <FaEnvelope size="3em" className="mb-2" />,
	"Your Reviews": <FaStar size="3em" className="mb-2" />,
	"Customer Service": <FaHeadset size="3em" className="mb-2" />,
	"Your Testimonials": <FaCertificate size="3em" className="mb-2" />,
};

const AccountCard = ({
	title,
	description,
	url,
}: {
	title: string;
	description: string;
	url?: string;
}) => {
	const icon = iconMapping[title] || (
		<FaRegListAlt size="3em" className="mb-2" />
	);

	// If url is not provided, return a div instead of a Link component
	if (!url) {
		return (
			<div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
				<div>{icon}</div>
				<h2 className="font-semibold text-lg mb-1">{title}</h2>
				<p className="text-gray-600 text-sm">{description}</p>
			</div>
		);
	}

	return (
		<Link href={url} className="text-decoration-none">
			<div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
				<div>{icon}</div>
				<h2 className="font-semibold text-lg mb-1">{title}</h2>
				<p className="text-gray-600 text-sm">{description}</p>
			</div>
		</Link>
	);
};

export default AccountCard;
