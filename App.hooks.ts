import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from '@hookstate/core';
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	useFonts
} from '@expo-google-fonts/inter';
import { getTokenList } from '@models/wallet';
import Logger from '@utils/logger';
import appsFlyer from 'react-native-appsflyer';
import { APPS_FLYER_DEV_KEY } from '@env';
import { globalWalletState } from './src/stores/WalletStore';
import coins from './src/utils/files/coins.json';

export const useApp = () => {
	const [coinList, setCoinList] = React.useState<any>();

	const walletState = useState(globalWalletState());
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold
	});

	const initializeAppsFlyer = () => {
		if (!__DEV__) {
			appsFlyer.initSdk(
				{
					devKey: (APPS_FLYER_DEV_KEY || process.env.APPS_FLYER_DEV_KEY)!,
					isDebug: false, // set to true if you want to see data in the logs
					appId: '1585144414' // iOS app id
				},
				(result) => {
					Logger.log(result);
				},
				(error) => {
					Logger.error(error);
				}
			);
		}
	};

	useEffect(() => {
		const getCoinList = async () => {
			try {
				const data = await getTokenList();
				setCoinList(data);
				AsyncStorage.setItem('@listCoins', JSON.stringify(data));
			} catch (error) {
				setCoinList(coins);
				AsyncStorage.setItem('@listCoins', JSON.stringify(coins));
			}
		};
		getCoinList();
		initializeAppsFlyer();
	}, []);

	return {
		walletState,
		coinList,
		fontsLoaded
	};
};
