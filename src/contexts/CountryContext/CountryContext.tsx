/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { countries, CountriesType } from '@styles';

export const CountryContext = createContext<any>(null);

const CountryProvider: React.FC = ({ children }) => {
	const [country, setCountry] = useState<string>('');
	// const [country, setCountry] = useState<string>(countries[Localization.region! as CountriesType]);

	useEffect(() => {
		const fetchCountry = async () => {
			const storedLocation = await AsyncStorage.getItem('@77777');
			if (storedLocation) setCountry(storedLocation);
		};
		fetchCountry();
	}, []);

	useEffect(() => {
		const storeCountry = async () => {
			await AsyncStorage.setItem('@77777', country!);
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
