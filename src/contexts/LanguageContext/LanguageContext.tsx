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
				name: i18n.t('LocationContext.AU.name'),
				flag: 'australia',
				iso: 'AU',
				currencyName: i18n.t('LocationContext.AU.currencyName'),
				currency: 'AUD',
				paymentName: 'PayID'
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
				name: i18n.t('LocationContext.AUT.name'),
				flag: 'austria',
				iso: 'AUT',
				currencyName: i18n.t('LocationContext.AUT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.BEL.name'),
				flag: 'belgium',
				iso: 'BEL',
				currencyName: i18n.t('LocationContext.BEL.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.BGR.name'),
				flag: 'bulgaria',
				iso: 'BGR',
				currencyName: i18n.t('LocationContext.BGR.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.HRV.name'),
				flag: 'croatia',
				iso: 'HRV',
				currencyName: i18n.t('LocationContext.HRV.currencyName'),
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
				name: i18n.t('LocationContext.CY.name'),
				flag: 'cyprus',
				iso: 'CY',
				currencyName: i18n.t('LocationContext.CY.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.CZE.name'),
				flag: 'czechRepublic',
				iso: 'CZE',
				currencyName: i18n.t('LocationContext.CZE.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.DNK.name'),
				flag: 'denmark',
				iso: 'DNK',
				currencyName: i18n.t('LocationContext.DNK.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.EST.name'),
				flag: 'estonia',
				iso: 'EST',
				currencyName: i18n.t('LocationContext.EST.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.FIN.name'),
				flag: 'finland',
				iso: 'FIN',
				currencyName: i18n.t('LocationContext.FIN.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.FRA.name'),
				flag: 'france',
				iso: 'FRA',
				currencyName: i18n.t('LocationContext.FRA.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.DEU.name'),
				flag: 'germany',
				iso: 'DEU',
				currencyName: i18n.t('LocationContext.DEU.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.GRC.name'),
				flag: 'greece',
				iso: 'GRC',
				currencyName: i18n.t('LocationContext.GRC.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.HUN.name'),
				flag: 'hungary',
				iso: 'HUN',
				currencyName: i18n.t('LocationContext.HUN.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.IRL.name'),
				flag: 'ireland',
				iso: 'IRL',
				currencyName: i18n.t('LocationContext.IRL.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.ITA.name'),
				flag: 'italy',
				iso: 'ITA',
				currencyName: i18n.t('LocationContext.ITA.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.LVA.name'),
				flag: 'latvia',
				iso: 'LVA',
				currencyName: i18n.t('LocationContext.LVA.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.LTU.name'),
				flag: 'lithuania',
				iso: 'LTU',
				currencyName: i18n.t('LocationContext.LTU.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.LUX.name'),
				flag: 'luxembourg',
				iso: 'LUX',
				currencyName: i18n.t('LocationContext.LUX.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.MLT.name'),
				flag: 'malta',
				iso: 'MLT',
				currencyName: i18n.t('LocationContext.MLT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.NLD.name'),
				flag: 'netherlands',
				iso: 'NLD',
				currencyName: i18n.t('LocationContext.NLD.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.POL.name'),
				flag: 'poland',
				iso: 'POL',
				currencyName: i18n.t('LocationContext.POL.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.PRT.name'),
				flag: 'portugal',
				iso: 'PRT',
				currencyName: i18n.t('LocationContext.PRT.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.ROU.name'),
				flag: 'romania',
				iso: 'ROU',
				currencyName: i18n.t('LocationContext.ROU.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.SVK.name'),
				flag: 'slovakia',
				iso: 'SVK',
				currencyName: i18n.t('LocationContext.SVK.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.SVN.name'),
				flag: 'slovenia',
				iso: 'SVN',
				currencyName: i18n.t('LocationContext.SVN.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.ESP.name'),
				flag: 'spain',
				iso: 'ESP',
				currencyName: i18n.t('LocationContext.ESP.currencyName'),
				currency: 'EUR',
				paymentName: 'SEPA'
			},
			{
				name: i18n.t('LocationContext.SWE.name'),
				flag: 'sweden',
				iso: 'SWE',
				currencyName: i18n.t('LocationContext.SWE.currencyName'),
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

	const countryByIso = useCallback((flag: string) => countries.find((c: Country) => c.flag === flag), [countries]);

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
