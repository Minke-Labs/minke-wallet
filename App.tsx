import 'expo-dev-client';
import React from 'react';
import Routes from '@routes';
import AppLoading from 'expo-app-loading';
import * as Sentry from '@sentry/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useApp } from './App.hooks';
import { Providers } from './Providers';

const App = () => {
	const { walletState, coinList, fontsLoaded } = useApp();
	if (!coinList || !fontsLoaded || walletState.promised) return <AppLoading />;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Providers>
				<Routes />
			</Providers>
		</GestureHandlerRootView>
	);
};

export default Sentry.wrap(App);
