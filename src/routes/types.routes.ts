import { MinkeToken } from '@models/token';

export type RootStackParamList = {
	AccountsScreen: undefined;
	AssetsScreen: { coin: MinkeToken };
	BackupScreen: undefined;
	BackupSettingsScreen: undefined;
	ChangeNetworkScreen: undefined;
	ContactCreateScreen: undefined;
	DepositScreen: undefined;
	ExchangeResumeScreen: undefined;
	ExchangeScreen: undefined;
	SaveScreen: undefined;
	SettingsScreen: undefined;
	TransactionsScreen: undefined;
	USDCoinScreen: undefined;
	WalletAssetsScreen: undefined;
	WalletCreatedScreen: undefined;
	WalletScreen: undefined;
	WelcomeScreen: undefined; // undefined because you aren't passing any params to the home screen
	DepositSuccessScreen: undefined;
	Test: undefined;
	BackupToICloudScreen: { missingPassword: boolean };
};
