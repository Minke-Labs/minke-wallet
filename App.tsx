import 'expo-dev-client';
import React from 'react';
import { ThemeProvider, AmplitudeProvider } from '@contexts';
import Routes from '@routes';
import AppLoading from 'expo-app-loading';
import Logger from '@utils/logger';
import * as Sentry from '@sentry/react-native';
import { useApp } from './App.hooks';

Logger.initialize();

const App = () => {
	const { walletState, coinList, fontsLoaded } = useApp();
	if (!coinList || !fontsLoaded || walletState.promised) return <AppLoading />;

	return (
		<AmplitudeProvider>
			<ThemeProvider>
				<Routes />
			</ThemeProvider>
		</AmplitudeProvider>
	);
};

export default Sentry.wrap(App);
