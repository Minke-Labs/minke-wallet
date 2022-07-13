import React, { createContext, useMemo, useState, useEffect, useCallback } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCountry from '../../hooks/useCountry';
import { availableLanguagues } from '../../localization';
import { Country } from './LanguageContext.types';
import { mock } from './LanguageContext.utils';

export const LanguageContext = createContext<any>(null);

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
			setLanguage(storedLanguage || Localization.locale);
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
				name: i18n.t('LocationContext.US.name'),
				flag: 'unitedStates',
				iso: 'US',
				currencyName: i18n.t('LocationContext.US.currencyName'),
				currency: 'USD',
				paymentName: null
			},
			{
				name: i18n.t('LocationContext.EU.name'),
				flag: 'europeanUnion',
				iso: 'EU',
				currencyName: i18n.t('LocationContext.EU.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.UK.name'),
				flag: 'unitedKingdom',
				iso: 'UK',
				currencyName: i18n.t('LocationContext.UK.currencyName'),
				currency: 'GBP',
				paymentName: 'Bank Transfer'
			},
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
				name: i18n.t('LocationContext.BR.name'),
				flag: 'brazil',
				iso: 'BR',
				currencyName: i18n.t('LocationContext.BR.currencyName'),
				currency: 'BRL',
				paymentName: 'PIX'
			},
			{
				name: i18n.t('LocationContext.TUR.name'),
				flag: 'turkey',
				iso: 'TUR',
				currencyName: i18n.t('LocationContext.TUR.currencyName'),
				currency: 'TRY',
				paymentName: 'Turkey Bank Transfer'
			}
		],
		[language]
	);

	const countryByIso = useCallback(
		(iso: string) => countries.find((c: Country) => c.iso === iso),
		[countries]
	);

	const locationCountry = useMemo(() => countryByIso(country || mock.country), [country]);

	const obj = useMemo(
		() => ({
			i18n,
			language,
			countries,
			setLanguage,
			locationCurrency: locationCountry?.currency ?? mock.countries[0].currency,
			locationCountry
		}),
		[language, country]
	);

	return <LanguageContext.Provider value={obj}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
