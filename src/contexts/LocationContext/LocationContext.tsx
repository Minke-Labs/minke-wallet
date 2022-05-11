import React, { createContext, useMemo, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { LocationContextProps } from './LocationContext.types';
import { mock, countries, countryByIso } from './LocationContext.utils';

export const LocationContext = createContext<LocationContextProps>(mock);

const LocationProvider: React.FC = ({ children }) => {
	const [countryCode, setCountryCode] = useState<string | null>(Localization.region);

	useEffect(() => {
		const fetchLocation = async () => {
			const storedLocation = await AsyncStorage.getItem('@location');
			setCountryCode(storedLocation || mock.countryCode);
		};
		fetchLocation();
	}, []);

	useEffect(() => {
		const storeLocation = async () => {
			await AsyncStorage.setItem('@location', countryCode!);
		};
		storeLocation();
	}, [countryCode]);

	const saveLocation = async (val: string) => setCountryCode(val);

	const locationCountry = useMemo(() => countryByIso(countryCode || mock.countryCode), [countryCode]);

	const providerObj = useMemo(
		() => ({
			countryCode,
			setCountryCode: saveLocation,
			countries,
			locationCurrency: locationCountry?.currency ?? mock.countries[0].currency,
			paymentOnLocation: locationCountry?.payment_id ?? null,
			locationCountry
		}),
		[countryCode]
	);

	return <LocationContext.Provider value={providerObj}>{children}</LocationContext.Provider>;
};

export default LocationProvider;
