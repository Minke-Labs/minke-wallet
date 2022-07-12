import 'expo-dev-client';
import React from 'react';
import Routes from '@routes';
import { Platform } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Sentry from '@sentry/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import { useApp } from './App.hooks';
import { Providers } from './Providers';

const App = () => {
	const { walletState, coinList, fontsLoaded } = useApp();
	if (!coinList || !fontsLoaded || walletState.promised) return <AppLoading />;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<WalletConnectProvider
				redirectUrl={Platform.OS === 'web' ? window.location.origin : Linking.createURL('/')}
				storageOptions={{
					asyncStorage: AsyncStorage
				}}
			>
				<Providers>
					<Routes />
				</Providers>
			</WalletConnectProvider>
		</GestureHandlerRootView>
	);
};

export default Sentry.wrap(App);
