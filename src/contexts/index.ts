import ThemeProvider, { ThemeContext } from './themeContext/ThemeContext';
import AvatarProvider, { AvatarContext } from './AvatarContext/AvatarContext';
import AmplitudeProvider, { AmplitudeContext } from './AmplitudeContext/AmplitudeContext';
import BiconomyProvider, { BiconomyContext } from './BiconomyContext/BiconomyContext';
import LanguageProvider, { LanguageContext } from './LanguageContext/LanguageContext';
import NetworkProvider, { NetworkContext } from './NetworkContext/NetworkContext';
import TransactionsProvider, { TransactionsContext } from './TransactionsContext/TransactionsContext';

export {
	AvatarContext,
	ThemeContext,
	AmplitudeContext,
	LanguageContext,
	BiconomyContext,
	TransactionsContext,
	NetworkContext,
	TransactionsProvider
};

export const providers = [
	AvatarProvider,
	ThemeProvider,
	AmplitudeProvider,
	BiconomyProvider,
	NetworkProvider,
	LanguageProvider
];
