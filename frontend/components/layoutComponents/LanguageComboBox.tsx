"use client";

import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { LanguageContext } from "@/app/LanguageContext";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "../ui/command";

const frameworks = [
	{
		value: "en",
		label: "English",
	},
	{
		value: "fr",
		label: "French",
	},
	{
		value: "it",
		label: "Italian",
	},
	{
		value: "es",
		label: "Spanish",
	},
	{
		value: "pt-PT",
		label: "Portugese",
	},
	{
		value: "de",
		label: "German",
	},
	{
		value: "ja",
		label: "Japan",
	},
];

export function LanguageComboBox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
	const [label, setLabel] = React.useState("English");

	// Call this function when a new language is selected
	const handleLanguageChange = (languageCode: any, label: any) => {
		setCurrentLanguage(languageCode);
		setLabel(label);
		// fetchLocalizedContent(languageCode);
	};

	const [localizedMessages, setLocalizedMessages] = useState({});

	const fetchLocalizedContent = async (languageCode: any) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/languages/messages`,
				{
					method: "GET",
					headers: {
						"Accept-Language": languageCode,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const languages = await response.text();
			setLocalizedMessages(languages);
		} catch (error) {
			console.error("Error fetching localized content:", error);
		}
	};

	// Call fetchLocalizedContent when the language context changes
	// useEffect(() => {
	// 	fetchLocalizedContent(currentLanguage);
	// }, [currentLanguage]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					role="combobox"
					aria-expanded={open}
					className="w-[100px] justify-between">
					{value
						? frameworks.find((framework) => framework.value === value)?.label
						: "English"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search Language" />
					<CommandEmpty>No Language found.</CommandEmpty>
					<CommandGroup>
						{frameworks.map((framework) => (
							<CommandItem
								key={framework.value}
								value={framework.value}
								// onSelect={(currentValue: any) => {
								// 	setValue(currentValue === value ? "" : currentValue);
								// 	setOpen(false);
								// }}
								onSelect={() => {
									handleLanguageChange(framework.value, framework.label);
									setOpen(false);
								}}>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === framework.value ? "opacity-100" : "opacity-0"
									)}
								/>
								{framework.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
