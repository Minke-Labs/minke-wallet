import WalletConnect from '@walletconnect/client';

export interface WithdrawParams {
	gasless: boolean;
	address: string;
	privateKey: string | null;
	amount: string; // WEI
	minAmount: string; // WEI
	gasPrice: string; // WEI
	biconomy: any;
	token: string;
	interestBearingToken: string;
	walletConnect: boolean;
	connector: WalletConnect;
}
export type WithdrawReturn = string | null;
