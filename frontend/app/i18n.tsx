import { IntlProvider } from "react-intl";
import English from "@/locales/en.json";
import French from "@/locales/fr.json";

const messages = {
	en: English,
	fr: French,
};

export function I18nProvider({ children, currentLocale }: any) {
	const messageFile = messages[currentLocale] || messages["en"];

	return (
		<IntlProvider
			locale={currentLocale}
			messages={messageFile}
			defaultLocale="en">
			{children}
		</IntlProvider>
	);
}
