import React, { createContext, useMemo, useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { translationObj } from '../../localization';

export const LanguageContext = createContext<any>(null);

const LanguageProvider: React.FC = ({ children }) => {
	const [language, setLanguage] = useState(Localization.locale);

	// Set the key-value pairs for the different languages you want to support.
	i18n.translations = translationObj;
	// Set the locale once at the beginning of your app.
	i18n.locale = language;
	// When a value is missing from a language it'll fallback to another language with the key present.
	i18n.fallbacks = true;

	const obj = useMemo(
		() => ({
			i18n,
			language,
			setLanguage
		}),
		[language]
	);

	return <LanguageContext.Provider value={obj}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
