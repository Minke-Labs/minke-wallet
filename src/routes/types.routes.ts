import { WalletToken } from '@models/wallet';

export type RootStackParamList = {
	Welcome: undefined; // undefined because you aren't passing any params to the home screen
	Backup: undefined;
	Wallet: undefined;
	AssetsScreen: { coin: WalletToken };
	WalletAssetsScreen: undefined;
	WalletCreated: undefined;
	TransactionSelectFunds: undefined;
	TransactionContacts: { coin: string };
	TransactionTransfer: { coin: string; address: string };
	ContactCreate: undefined;
	Exchange: undefined;
	ExchangeResume: undefined;
	Settings: undefined;
	ChangeNetwork: undefined;
	Accounts: undefined;
	BackupSettings: undefined;
	Transactions: undefined;
	SaveScreen: undefined;
	Deposit: undefined;
	USDCoin: undefined;
	DepositSuccess: undefined;
	Test: undefined;
	OpenAave: undefined;
};
