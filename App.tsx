import 'expo-dev-client';
import React from 'react';
import { ThemeProvider, AmplitudeProvider, BiconomyProvider } from '@contexts';
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
		<BiconomyProvider>
			<AmplitudeProvider>
				<ThemeProvider>
					<Routes />
				</ThemeProvider>
			</AmplitudeProvider>
		</BiconomyProvider>
	);
};

export default Sentry.wrap(App);
