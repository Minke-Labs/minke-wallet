import ThemeProvider, { ThemeContext } from './themeContext/ThemeContext';
import AmplitudeProvider, { AmplitudeContext } from './AmplitudeContext/AmplitudeContext';
import BiconomyProvider, { BiconomyContext } from './BiconomyContext/BiconomyContext';
import LanguageProvider, { LanguageContext } from './LanguageContext/LanguageContext';
import NetworkProvider, { NetworkContext } from './NetworkContext/NetworkContext';
import TransactionsProvider, { TransactionsContext } from './TransactionsContext/TransactionsContext';

export {
	ThemeContext,
	AmplitudeContext,
	LanguageContext,
	BiconomyContext,
	TransactionsContext,
	NetworkContext,
	TransactionsProvider
};

export const providers = [
	ThemeProvider,
	AmplitudeProvider,
	BiconomyProvider,
	NetworkProvider,
	LanguageProvider
];
