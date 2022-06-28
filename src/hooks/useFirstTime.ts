import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFistTime = () => {
	const [loading, setLoading] = useState(true);
	const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false);

	const checkForFirstTimeLoaded = async () => {
		const result = await AsyncStorage.getItem('isFirstTimeLoaded?');
		if (result === null) {
			setIsFirstTimeLoad(true);
			AsyncStorage.setItem('isFirstTimeLoaded?', 'no');
		} else {
			setIsFirstTimeLoad(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		checkForFirstTimeLoaded();
	}, []);

	return {
		loading,
		isFirstTimeLoad
	};
};

export default useFistTime;
