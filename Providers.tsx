import React from 'react';
import { ThemeProvider, AmplitudeProvider, BiconomyProvider, LocationProvider, LanguageProvider } from '@contexts';

export const Providers: React.FC = ({ children }) => (
	<LanguageProvider>
		<BiconomyProvider>
			<AmplitudeProvider>
				<ThemeProvider>
					<LocationProvider>
						{children}
					</LocationProvider>
				</ThemeProvider>
			</AmplitudeProvider>
		</BiconomyProvider>
	</LanguageProvider>
);
