import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
	Welcome: undefined; // undefined because you aren't passing any params to the home screen
	Backup: undefined;
	Wallet: undefined;
	WalletCreated: undefined;
	TransactionSelectFunds: undefined;
	TransactionContacts: { coin: string };
	TransactionTransfer: { coin: string; address: string };
	ContactCreate: undefined;
	Exchange: undefined;
	ExchangeResume: undefined;
	Settings: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
