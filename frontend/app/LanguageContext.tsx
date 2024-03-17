"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { I18nProvider } from "./i18n";

interface LanguageContextProps {
	currentLanguage: string;
	setCurrentLanguage: (language: string) => void;
}

// Create the context with a default value
export const LanguageContext = createContext<LanguageContextProps>({
	currentLanguage: "en",
	setCurrentLanguage: (language) => console.warn("no language provider"),
});

// Define props for the LanguageProvider for TypeScript
interface LanguageProviderProps {
	children: ReactNode;
}

// Create a LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
	children,
}) => {
	const [currentLanguage, setCurrentLanguage] = useState("en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language") || "en";
		setCurrentLanguage(savedLanguage);
	}, []);

	useEffect(() => {
		localStorage.setItem("language", currentLanguage);
	}, [currentLanguage]);

	return (
		<LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
			<I18nProvider currentLocale={currentLanguage}>{children}</I18nProvider>
		</LanguageContext.Provider>
	);
};
