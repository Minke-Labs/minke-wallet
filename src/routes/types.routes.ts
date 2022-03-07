import { WalletToken } from '@models/wallet';

export type RootStackParamList = {
	AccountsScreen: undefined;
	AssetsScreen: { coin: WalletToken };
	BackupScreen: undefined;
	BackupSettingsScreen: undefined;
	ChangeNetworkScreen: undefined;
	ContactCreateScreen: undefined;
	DepositScreen: undefined;
	ExchangeResumeScreen: undefined;
	ExchangeScreen: undefined;
	SaveScreen: undefined;
	SettingsScreen: undefined;
	TransactionContactsScreen: { coin: string };
	TransactionSelectFundsScreen: undefined;
	TransactionsScreen: undefined;
	TransactionTransferScreen: { coin: string; address: string };
	USDCoinScreen: undefined;
	WalletAssetsScreen: undefined;
	WalletCreatedScreen: undefined;
	WalletScreen: undefined;
	WelcomeScreen: undefined; // undefined because you aren't passing any params to the home screen

	DepositSuccessScreen: undefined;
	Test: undefined;
	OpenAave: undefined;
};
