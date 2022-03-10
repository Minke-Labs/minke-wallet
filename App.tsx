import 'expo-dev-client';
import React from 'react';
import { useState } from '@hookstate/core';
import { ThemeProvider } from '@contexts';
import Routes from '@routes';
import AppLoading from 'expo-app-loading';
import {
	Inter_400Regular,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_500Medium,
	useFonts
} from '@expo-google-fonts/inter';
import { globalWalletState } from './src/stores/WalletStore';

const App = () => {
	const walletState = useState(globalWalletState());

	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_500Medium
	});
	if (!fontsLoaded || walletState.promised) return <AppLoading />;

	return (
		<ThemeProvider>
			<Routes />
		</ThemeProvider>
	);
};

export default App;
