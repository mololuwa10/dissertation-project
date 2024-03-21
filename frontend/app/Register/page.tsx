"use client";

import RegisterComponents from "@/components/RegisterComponents/RegisterComponents.client";
import RootLayout from "../layout";
import { LanguageProvider } from "../LanguageContext";

export default function Register() {
	return (
		<>
			<LanguageProvider>
				<RegisterComponents />
			</LanguageProvider>
		</>
	);
}
