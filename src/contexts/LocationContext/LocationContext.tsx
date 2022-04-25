import React, { createContext, useMemo, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { LocationContextProps } from './LocationContext.types';
import { mock, currencies, currencyByIso } from './LocationContext.utils';

export const LocationContext = createContext<LocationContextProps>(mock);

const LocationProvider: React.FC = ({ children }) => {
	const [errorMsg, setErrorMsg] = useState<string>();
	const [countryCode, setCountryCode] = useState<string | null>('');

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			const coords = await Location.getCurrentPositionAsync({});
			const countryObj = await Location.reverseGeocodeAsync(coords.coords);
			setCountryCode(countryObj[0].isoCountryCode);
		})();
	}, []);

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

	const locationCurrency = useMemo(() => currencyByIso(countryCode || mock.countryCode), [countryCode]);

	const providerObj = useMemo(
		() => ({
			countryCode,
			setCountryCode: saveLocation,
			errorMsg,
			currencies,
			locationCurrency: locationCurrency!.currency
		}),
		[countryCode]
	);

	return <LocationContext.Provider value={providerObj}>{children}</LocationContext.Provider>;
};

export default LocationProvider;
