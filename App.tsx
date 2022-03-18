import 'expo-dev-client';
import React from 'react';
import { ThemeProvider } from '@contexts';
import Routes from '@routes';
import AppLoading from 'expo-app-loading';
import { useApp } from './App.hooks';

const App = () => {
	const { walletState, coinList, fontsLoaded } = useApp();
	if (!coinList || !fontsLoaded || walletState.promised) return <AppLoading />;
	return (
		<ThemeProvider>
			<Routes />
		</ThemeProvider>
	);
};
export default App;
