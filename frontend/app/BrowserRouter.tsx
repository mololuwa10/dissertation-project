import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from "./SearchResults/page";

<BrowserRouter>
	<Routes>
		<Route path="/SearchResults" element={<SearchResults />} />
	</Routes>
</BrowserRouter>;
