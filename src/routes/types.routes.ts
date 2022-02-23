import { WalletToken } from '@models/wallet';

export type RootStackParamList = {
	Welcome: undefined; // undefined because you aren't passing any params to the home screen
	Backup: undefined;
	Wallet: undefined;
	Assets: { coin: WalletToken };
	WalletAssets: undefined;
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
	Test: undefined;
};
