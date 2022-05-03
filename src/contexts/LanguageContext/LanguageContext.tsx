import React, { createContext, useMemo, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

	useEffect(() => {
		const fetchLocation = async () => {
			const storedLanguage = await AsyncStorage.getItem('@language');
			setLanguage(storedLanguage || Localization.locale);
		};
		fetchLocation();
	}, []);

	useEffect(() => {
		const storeLanguage = async () => {
			await AsyncStorage.setItem('@language', language!);
		};
		storeLanguage();
	}, [language]);

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
