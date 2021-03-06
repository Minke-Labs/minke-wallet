import React, { createContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { countries, CountriesType } from '@styles';

export const CountryContext = createContext<any>(null);

const CountryProvider: React.FC = ({ children }) => {
	const [country, setCountry] = useState<string>(countries[Localization.region! as CountriesType]);

	useEffect(() => {
		const fetchCountry = async () => {
			const storedLocation = await AsyncStorage.getItem('@country');
			if (storedLocation) setCountry(storedLocation);
		};
		fetchCountry();
	}, []);

	useEffect(() => {
		const storeCountry = async () => {
			await AsyncStorage.setItem('@country', country!);
		};
		storeCountry();
	}, [country]);

	const obj = useMemo(
		() => ({
			country,
			setCountry
		}),
		[country]
	);

	return <CountryContext.Provider value={obj}>{children}</CountryContext.Provider>;
};

export default CountryProvider;
