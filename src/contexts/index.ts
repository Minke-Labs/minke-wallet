import ThemeProvider, { ThemeContext } from './themeContext/ThemeContext';
import AvatarProvider, { AvatarContext } from './AvatarContext/AvatarContext';
import AmplitudeProvider, { AmplitudeContext } from './AmplitudeContext/AmplitudeContext';
import BiconomyProvider, { BiconomyContext } from './BiconomyContext/BiconomyContext';
import CountryProvider, { CountryContext } from './CountryContext/CountryContext';
import LanguageProvider, { LanguageContext } from './LanguageContext/LanguageContext';
import NetworkProvider, { NetworkContext } from './NetworkContext/NetworkContext';
import TransactionsProvider, { TransactionsContext } from './TransactionsContext/TransactionsContext';

export {
	ThemeContext,
	AmplitudeContext,
	LanguageContext,
	AvatarContext,
	BiconomyContext,
	CountryContext,
	TransactionsContext,
	NetworkContext,
	TransactionsProvider
};

export const providers = [
	ThemeProvider,
	AmplitudeProvider,
	BiconomyProvider,
	CountryProvider,
	NetworkProvider,
	LanguageProvider,
	AvatarProvider
];
