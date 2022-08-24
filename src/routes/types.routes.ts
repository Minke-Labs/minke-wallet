import { NFT } from '@models/types/nft.types';
import { MinkeToken } from '@models/types/token.types';
import { ZapperTransaction } from '@models/wallet';

export type RootStackParamList = {
	AccountsScreen: undefined;
	AssetsScreen: { coin: MinkeToken };
	ManualBackupScreen: { walletId: string };
	NFTScreen: undefined;
	NFTDetailScreen: { nft: NFT };
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
	RedeemScreen: { code: string | undefined };
	RedeemConfirmScreen: undefined;
	TransferWaitScreen: { transferId: string };
	DevSettingsScreen: undefined;
	ImportWalletScreen: undefined;
	AddFundsScreen: undefined;
	TransactionScreen: { transaction: ZapperTransaction };
	MoonpayWaitScreen: { transactionId: string };
	Test: undefined;
};
