"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
		value: "English",
		label: "English",
	},
	{
		value: "French",
		label: "French",
	},
	{
		value: "Italian",
		label: "Italian",
	},
	{
		value: "Spanish",
		label: "Spanish",
	},
	{
		value: "Yoruba",
		label: "Yoruba",
	},
];

export function LanguageComboBox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

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
								onSelect={(currentValue: any) => {
									setValue(currentValue === value ? "" : currentValue);
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
