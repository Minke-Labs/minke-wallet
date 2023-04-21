import 'expo-dev-client';
import '@walletconnect/react-native-compat';
import 'fast-text-encoding';

import AppLoading from 'expo-app-loading';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Routes from '@routes';
import * as Sentry from '@sentry/react-native';

import { useApp } from './App.hooks';
import { Providers } from './Providers';

const App = () => {
	const { walletState, fontsLoaded } = useApp();
	if (!fontsLoaded || walletState.promised) return <AppLoading />;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Providers>
				<Routes />
			</Providers>
		</GestureHandlerRootView>
	);
};

export default Sentry.wrap(App);
