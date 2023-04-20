import 'expo-dev-client';

import AppLoading from 'expo-app-loading';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as encoding from 'text-encoding';

import Routes from '@routes';
import * as Sentry from '@sentry/react-native';

import { useApp } from './App.hooks';
import { Providers } from './Providers';

const TextEncodingPolyfill = require('text-encoding');
const BigInt = require('big-integer');

Object.assign(global, {
	TextEncoder: TextEncodingPolyfill.TextEncoder,
	TextDecoder: TextEncodingPolyfill.TextDecoder,
	BigInt
});

const App = () => {
	console.log(encoding);
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
