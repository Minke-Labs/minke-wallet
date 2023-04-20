import AmplitudeProvider, { AmplitudeContext } from './AmplitudeContext/AmplitudeContext';
import AvatarProvider, { AvatarContext } from './AvatarContext/AvatarContext';
import BalanceProvider, { BalanceContext } from './BalanceContext/BalanceContext';
import BiconomyProvider, { BiconomyContext } from './BiconomyContext/BiconomyContext';
import CountryProvider, { CountryContext } from './CountryContext/CountryContext';
import LanguageProvider, { LanguageContext } from './LanguageContext/LanguageContext';
import NetworkProvider, { NetworkContext } from './NetworkContext/NetworkContext';
import NFTProvider, { NFTContext } from './NFTContext/NFTContext';
import ThemeProvider, { ThemeContext } from './themeContext/ThemeContext';
import TransactionsProvider, { TransactionsContext } from './TransactionsContext/TransactionsContext';
import WalletProvider, { WalletContext } from './WalletContext/WalletContext';

// import WalletConnectProvider from './WalletConnectContext/WalletConnectContext';

export {
	WalletContext,
	BalanceContext,
	ThemeContext,
	AmplitudeContext,
	LanguageContext,
	AvatarContext,
	BiconomyContext,
	CountryContext,
	TransactionsContext,
	NetworkContext,
	TransactionsProvider,
	NFTContext
};

export const providers = [
	WalletProvider,
	BalanceProvider,
	ThemeProvider,
	AmplitudeProvider,
	BiconomyProvider,
	CountryProvider,
	NetworkProvider,
	LanguageProvider,
	AvatarProvider,
	// WalletConnectProvider,
	NFTProvider
];
