import Header from "@/components/layoutComponents/Header";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<main className="flex min-h-screen flex-col justify-between">
				<Header />
			</main>
		</>
	);
}