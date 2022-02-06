import React from 'react';
import {
	// ThemeProvider,
	ThemeProvider
} from '@contexts';
import Routes from '@routes';
import AppLoading from 'expo-app-loading';
import {
	Inter_400Regular,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_500Medium,
	useFonts
} from '@expo-google-fonts/inter';

const App = () => {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_700Bold,
		Inter_800ExtraBold,
		Inter_500Medium
	});
	if (!fontsLoaded) return <AppLoading />;

	return (
		<ThemeProvider>
			{/* <ThemeProvider> */}
			<Routes />
			{/* </ThemeProvider> */}
		</ThemeProvider>
	);
};

export default App;
