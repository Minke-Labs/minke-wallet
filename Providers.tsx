import React from 'react';
import { ThemeProvider, AmplitudeProvider, BiconomyProvider, LocationProvider } from '@contexts';

export const Providers: React.FC = ({ children }) => (
	<BiconomyProvider>
		<AmplitudeProvider>
			<ThemeProvider>
				<LocationProvider>
					{children}
				</LocationProvider>
			</ThemeProvider>
		</AmplitudeProvider>
	</BiconomyProvider>
);
