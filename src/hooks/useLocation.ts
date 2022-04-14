import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultLocation = 'unitedStates';

const useLocation = () => {
	const [location, setLocation] = useState(defaultLocation);

	const setGlobalLocation = (val: string) => {
		AsyncStorage.setItem('@location', val);
		setLocation(val);
	};

	return {
		location,
		setLocation: setGlobalLocation
	};
};

export default useLocation;
