import { MinkeToken } from '@models/token';

export type RootStackParamList = {
	AccountsScreen: undefined;
	AssetsScreen: { coin: MinkeToken };
	ManualBackupScreen: { walletId: string };
	BackupSettingsScreen: undefined;
	ChangeLanguageScreen: undefined;
	BackupStatusScreen: { walletId: string; finishedBackup?: boolean };
	ChangeNetworkScreen: undefined;
	ChangeCountryScreen: undefined;
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
	DepositWithdrawalSuccessScreen: { type: 'deposit' | 'withdrawal' };
	BackupToICloudScreen: { missingPassword: boolean; walletId?: string | undefined; restoreBackups?: boolean };
	OpenAave: undefined;
	TopUpWaitScreen: undefined;
	WithdrawScreen: undefined;
	SavingAccountsScreen: undefined;
	ReferralScreen: undefined;
	EnterReferralCodeScreen: undefined;
	Test: undefined;
};
