import { useEffect, useState } from 'react';
import { usdCoinSettingsKey, usdCoin as selectedUSDCoin } from '@models/deposit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUSDCoinScreen = () => {
	const [usdCoin, setUsdCoin] = useState('');

	const onSelectCoin = async (token: string) => {
		await AsyncStorage.setItem(usdCoinSettingsKey, token);
		setUsdCoin(token);
	};

	useEffect(() => {
		const fetchSelectedCoin = async () => {
			setUsdCoin(await selectedUSDCoin());
		};

		fetchSelectedCoin();
	}, []);

	return {
		usdCoin,
		onSelectCoin
	};
};
