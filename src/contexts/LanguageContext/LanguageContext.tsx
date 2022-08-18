import React, { createContext, useMemo, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCountry from '../../hooks/useCountry';
import { availableLanguagues } from '../../localization';
import { Country } from './LanguageContext.types';

interface LanguageContextProps {
	i18n: any;
	language: string;
	languages: string[];
	countries: Country[];
	setLanguage: (l: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({} as LanguageContextProps);

const LanguageProvider: React.FC = ({ children }) => {
	const { country } = useCountry();
	const languages = Object.keys(availableLanguagues);
	const [language, setLanguage] = useState(
		languages.includes(Localization.locale) ? Localization.locale : languages[0]
	);

	i18n.translations = availableLanguagues;
	i18n.locale = language;
	i18n.fallbacks = true;

	useEffect(() => {
		const fetchLocation = async () => {
			const storedLanguage = await AsyncStorage.getItem('@language');
			if (storedLanguage) setLanguage(storedLanguage);
		};
		fetchLocation();
	}, []);

	useEffect(() => {
		const storeLocalization = async () => {
			await AsyncStorage.setItem('@language', language!);
		};
		storeLocalization();
	}, [language, country]);

	const countries: Country[] = useMemo(
		() => [
			{
				name: i18n.t('LocationContext.AU.name'),
				flag: 'australia',
				iso: 'AU',
				currencyName: i18n.t('LocationContext.AU.currencyName'),
				currency: 'AUD',
				paymentName: 'PayID'
			},
			{
				name: i18n.t('LocationContext.CA.name'),
				flag: 'canada',
				iso: 'CA',
				currencyName: i18n.t('LocationContext.CA.currencyName'),
				currency: 'CAD',
				paymentName: 'Interac e-Transfer'
			},
			{
				name: i18n.t('LocationContext.US.name'),
				flag: 'unitedStates',
				iso: 'US',
				currencyName: i18n.t('LocationContext.US.currencyName'),
				currency: 'USD',
				paymentName: null
			},
			{
				name: i18n.t('LocationContext.TR.name'),
				flag: 'turkey',
				iso: 'TR',
				currencyName: i18n.t('LocationContext.TR.currencyName'),
				currency: 'TRY',
				paymentName: 'Turkish Bank Transfer'
			}
		],
		[language]
	);

	const obj = useMemo(
		() => ({
			i18n,
			language,
			languages,
			countries,
			setLanguage
		}),
		[language, country]
	);

	return <LanguageContext.Provider value={obj}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
