import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import RNUxcam from 'react-native-ux-cam';
import Logger from '@utils/logger';
import RNTestFlight from 'react-native-test-flight';
import { UXCAM_API_KEY } from '@env';
import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	useFonts
} from '@expo-google-fonts/inter';
import { globalWalletState } from './src/stores/WalletStore';

export const useApp = () => {
	const walletState = useState(globalWalletState());
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
		Inter_800ExtraBold
	});

	const initializeServices = async () => {
		Logger.initialize();

		if (!__DEV__) {
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
