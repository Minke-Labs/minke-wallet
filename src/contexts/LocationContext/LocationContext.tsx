import React, { createContext, useMemo, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocationContext = createContext<any>('');

const defaultLocation = 'unitedStates';

const LocationProvider: React.FC = ({ children }) => {
	const [location, setLocation] = useState('');

	useEffect(() => {
		const fetchLocation = async () => {
			const storedLocation = await AsyncStorage.getItem('@location');
			setLocation(storedLocation || defaultLocation);
		};
		fetchLocation();
	}, []);

	useEffect(() => {
		const storeLocation = async () => {
			await AsyncStorage.setItem('@location', location);
		};
		storeLocation();
	}, [location]);

	const saveLocation = async (val: string) => setLocation(val);

	const providerObj = useMemo(
		() => ({ location, setLocation: saveLocation }),
		[location]
	);

	return <LocationContext.Provider value={providerObj}>{children}</LocationContext.Provider>;
};

export default LocationProvider;
