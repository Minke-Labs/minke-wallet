import React from 'react';
import { ThemeProvider } from '@contexts';
import Routes from '@routes';

const App = () => (
	<ThemeProvider>
		<Routes />
	</ThemeProvider>
);

export default App;
