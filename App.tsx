import 'expo-dev-client';
import React from 'react';
import { ThemeProvider, AmplitudeProvider } from '@contexts';
import Routes from '@routes';
import { SENTRY_DSN } from '@env';
import AppLoading from 'expo-app-loading';
import * as Sentry from 'sentry-expo';
import { useApp } from './App.hooks';

Sentry.init({
	dsn: SENTRY_DSN || process.env.SENTRY_DSN,
	enableInExpoDevelopment: true,
	debug: true // Set it to `false` in production
});

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
export default App;
