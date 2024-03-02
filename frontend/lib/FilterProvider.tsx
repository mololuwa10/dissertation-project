// import React, { createContext, useContext, useState } from "react";

// export const FilterContext = createContext({
// 	filters: { categoryIds: new Set() },
// 	updateFilters: (newFilters: any) => {},
// });

// export const FilterProvider = ({ children }: { children: any }) => {
// 	const [filters, setFilters] = useState({ categoryIds: new Set() });

// 	const updateFilters = (newFilters: any) => {
// 		setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
// 	};

// 	return (
// 		<FilterContext.Provider value={{ filters, updateFilters }}>
// 			{children}
// 		</FilterContext.Provider>
// 	);
// };
