import ThemeProvider, { ThemeContext } from './themeContext/ThemeContext';
import AmplitudeProvider, { AmplitudeContext } from './AmplitudeContext/AmplitudeContext';
import BiconomyProvider, { BiconomyContext } from './BiconomyContext/BiconomyContext';
import LocationProvider, { LocationContext } from './LocationContext/LocationContext';
import LanguageProvider, { LanguageContext } from './LanguageContext/LanguageContext';
import TransactionsProvider, { TransactionsContext } from './TransactionsContext/TransactionsContext';

export {
	ThemeContext,
	AmplitudeContext,
	LanguageContext,
	BiconomyContext,
	TransactionsContext,
	LocationContext,
	TransactionsProvider
};

export const providers = [
	ThemeProvider,
	AmplitudeProvider,
	BiconomyProvider,
	LocationProvider,
	LanguageProvider
];
