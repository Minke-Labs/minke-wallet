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
				name: i18n.t('LocationContext.AU.name'),
				flag: 'australia',
				iso: 'AU',
				currencyName: i18n.t('LocationContext.AU.currencyName'),
				currency: 'AUD',
				paymentName: 'PayID'
			},
			{
				name: i18n.t('LocationContext.GB.name'),
				flag: 'unitedKingdom',
				iso: 'GB',
				currencyName: i18n.t('LocationContext.GB.currencyName'),
				currency: 'GBP',
				paymentName: 'Bank Transfer'
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
				name: i18n.t('LocationContext.EU.name'),
				flag: 'europeanUnion',
				iso: 'EU',
				currencyName: i18n.t('LocationContext.EU.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.AT.name'),
				flag: 'austria',
				iso: 'AT',
				currencyName: i18n.t('LocationContext.AT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.BE.name'),
				flag: 'belgium',
				iso: 'BE',
				currencyName: i18n.t('LocationContext.BE.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.CY.name'),
				flag: 'cyprus',
				iso: 'CY',
				currencyName: i18n.t('LocationContext.CY.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.EE.name'),
				flag: 'estonia',
				iso: 'EE',
				currencyName: i18n.t('LocationContext.EE.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.FI.name'),
				flag: 'finland',
				iso: 'FI',
				currencyName: i18n.t('LocationContext.FI.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.FR.name'),
				flag: 'france',
				iso: 'FR',
				currencyName: i18n.t('LocationContext.FRA.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.DE.name'),
				flag: 'germany',
				iso: 'DE',
				currencyName: i18n.t('LocationContext.DE.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.GR.name'),
				flag: 'greece',
				iso: 'GR',
				currencyName: i18n.t('LocationContext.GR.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.IE.name'),
				flag: 'ireland',
				iso: 'IE',
				currencyName: i18n.t('LocationContext.IE.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.IT.name'),
				flag: 'italy',
				iso: 'IT',
				currencyName: i18n.t('LocationContext.IT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.LV.name'),
				flag: 'latvia',
				iso: 'LV',
				currencyName: i18n.t('LocationContext.LV.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.LT.name'),
				flag: 'lithuania',
				iso: 'LT',
				currencyName: i18n.t('LocationContext.LT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.LU.name'),
				flag: 'luxembourg',
				iso: 'LU',
				currencyName: i18n.t('LocationContext.LU.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.MT.name'),
				flag: 'malta',
				iso: 'MT',
				currencyName: i18n.t('LocationContext.MT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.NL.name'),
				flag: 'netherlands',
				iso: 'NL',
				currencyName: i18n.t('LocationContext.NL.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.PT.name'),
				flag: 'portugal',
				iso: 'PT',
				currencyName: i18n.t('LocationContext.PT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.SK.name'),
				flag: 'slovakia',
				iso: 'SK',
				currencyName: i18n.t('LocationContext.SK.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.SI.name'),
				flag: 'slovenia',
				iso: 'SI',
				currencyName: i18n.t('LocationContext.SI.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.ES.name'),
				flag: 'spain',
				iso: 'ES',
				currencyName: i18n.t('LocationContext.ES.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
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
			countries,
			setLanguage
		}),
		[language, country]
	);

	return <LanguageContext.Provider value={obj}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
