import 'expo-dev-client';
import React from 'react';
import Routes from '@routes';
import AppLoading from 'expo-app-loading';
import * as Sentry from '@sentry/react-native';
import { useApp } from './App.hooks';
import { Providers } from './Providers';

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
