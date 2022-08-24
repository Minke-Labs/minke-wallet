import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import RNUxcam from 'react-native-ux-cam';
import Logger from '@utils/logger';
import RNTestFlight from 'react-native-test-flight';
import { UXCAM_API_KEY, APPS_FLYER_DEV_KEY } from '@env';
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	useFonts
} from '@expo-google-fonts/inter';
import appsFlyer from 'react-native-appsflyer';
import { globalWalletState } from './src/stores/WalletStore';

export const useApp = () => {
	Logger.initialize();

	const walletState = useState(globalWalletState());
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold
	});

	const initializeServices = () => {
		if (!__DEV__) {
			// APPSFLYER
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

			if (!RNTestFlight.isTestFlight) {
				// UXCAM
				const uxCamKey = UXCAM_API_KEY || process.env.UXCAM_API_KEY;
				RNUxcam.optIntoSchematicRecordings();
				RNUxcam.startWithConfiguration({ userAppKey: uxCamKey! });
			}
		}
	};

	useEffect(() => {
		initializeServices();
	}, []);

	return {
		walletState,
		fontsLoaded
	};
};
