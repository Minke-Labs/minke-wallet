import React from 'react';
import { Text } from 'react-native';
import { ThemeProvider } from '@contexts';

const App = () => (
	<ThemeProvider>
		<Text>APP aqui</Text>
	</ThemeProvider>
);

export default App;
