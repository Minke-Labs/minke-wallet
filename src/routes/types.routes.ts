import { NFT } from '@models/types/nft.types';
import { MinkeToken } from '@models/types/token.types';
import { ZapperTransaction } from '@models/wallet';
import { WebViewNavigation } from 'react-native-webview';

export type RootStackParamList = {
	AccountsScreen: undefined;
	InvestmentsDetailScreen: { coin: MinkeToken };
	ManualBackupScreen: { walletId: string };
	NFTScreen: undefined;
	NFTDetailScreen: { nft: NFT };
	HomeScreen: undefined;
	MinkeHubScreen: undefined;
	StablecoinsScreen: undefined;
	InvestmentsScreen: undefined;
	StablecoinsDetailScreen: { coin: MinkeToken };
	BackupSettingsScreen: undefined;
	ChangeLanguageScreen: undefined;
	BackupStatusScreen: { walletId: string; finishedBackup?: boolean };
	ChangeNetworkScreen: undefined;
	ChangeCountryScreen: undefined;
	DepositScreen: undefined;
	ExchangeResumeScreen: undefined;
	ExchangeScreen: { sourceToken?: MinkeToken; destToken?: MinkeToken };
	SaveScreen: undefined;
	SettingsScreen: undefined;
	TransactionsScreen: undefined;
	USDCoinScreen: undefined;
	WalletCreatedScreen: undefined;
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
	AddFundsScreen: { topupToken?: MinkeToken };
	TransactionsDetailScreen: { transaction: ZapperTransaction };
	MoonpayWaitScreen: { transactionId: string };
	WebViewScreen: { title: string; uri: string; onNavigationStateChange?: (event: WebViewNavigation) => void };
	SecurityScreen: undefined;
	Test: undefined;
};
