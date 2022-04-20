import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from '@hookstate/core';
import {
	Inter_400Regular,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_500Medium,
	useFonts
} from '@expo-google-fonts/inter';
import { getTokenList } from '@models/wallet';
import Logger from '@utils/logger';
import { globalWalletState } from './src/stores/WalletStore';

export const useApp = () => {
	const [coinList, setCoinList] = React.useState<any>();

	const walletState = useState(globalWalletState());
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_500Medium
	});

	useEffect(() => {
		const getCoinList = async () => {
			try {
				const data = await getTokenList();
				setCoinList(data);
				AsyncStorage.setItem('@listCoins', JSON.stringify(data));
			} catch {
				Logger.error('Error loading tokens from coingecko');
				setCoinList([]);
			}
		};
		getCoinList();
	}, []);

	return {
		walletState,
		coinList,
		fontsLoaded
	};
};
