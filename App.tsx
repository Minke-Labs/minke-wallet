import 'expo-dev-client';
import React from 'react';
import Routes from '@routes';
import AppLoading from 'expo-app-loading';
import Logger from '@utils/logger';
import * as Sentry from '@sentry/react-native';
import RNUxcam from 'react-native-ux-cam';
import { UXCAM_API_KEY } from '@env';
import { useApp } from './App.hooks';
import { Providers } from './Providers';

Logger.initialize();

const uxCamKey = UXCAM_API_KEY || process.env.UXCAM_API_KEY;

RNUxcam.optIntoSchematicRecordings();
RNUxcam.startWithKey(uxCamKey!);

const App = () => {
	const { walletState, coinList, fontsLoaded } = useApp();
	if (!coinList || !fontsLoaded || walletState.promised) return <AppLoading />;

	return (
		<Providers>
			<Routes />
		</Providers>
	);
};

export default Sentry.wrap(App);
