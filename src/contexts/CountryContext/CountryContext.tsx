import React, { createContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { countries, CountriesType } from '@styles';

export const CountryContext = createContext<any>(null);

const CountryProvider: React.FC = ({ children }) => {
	const [country, setCountry] = useState<string>();

	const countryCode = Object.keys(countries).find((key) => countries[key] === country);

	useEffect(() => {
		const fetchCountry = async () => {
			const storedLocation = await AsyncStorage.getItem('@country');
			setCountry(storedLocation || countries[Localization.region! as CountriesType]);
		};
		fetchCountry();
	}, []);

	useEffect(() => {
		const storeCountry = async () => {
			await AsyncStorage.setItem('@country', country!);
		};
		if (country) storeCountry();
	}, [country]);

	const obj = useMemo(
		() => ({
			country,
			setCountry,
			countryCode
		}),
		[country]
	);

	return <CountryContext.Provider value={obj}>{children}</CountryContext.Provider>;
};

export default CountryProvider;
