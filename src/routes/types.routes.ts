import { MinkeToken } from '@models/token';

export type RootStackParamList = {
	AccountsScreen: undefined;
	AssetsScreen: { coin: MinkeToken };
	ManualBackupScreen: { walletId: string };
	BackupSettingsScreen: undefined;
	BackupStatusScreen: { walletId: string; finishedBackup?: boolean };
	ChangeNetworkScreen: undefined;
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
	BackupToICloudScreen: { missingPassword: boolean; walletId?: string | undefined; restoreBackups?: boolean };
	OpenAave: undefined;
	TopUpWaitScreen: undefined;
};
