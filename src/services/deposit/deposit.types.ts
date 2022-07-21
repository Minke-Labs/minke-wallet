import { DepositableToken } from '@models/types/depositTokens.types';
import WalletConnect from '@walletconnect/client';

export interface DepositParams {
	gasless: boolean;
	address: string;
	privateKey: string | null;
	amount: string; // WEI
	minAmount: string; // WEI
	gasPrice: string; // WEI
	depositableToken: DepositableToken;
	biconomy: any;
	walletConnect: boolean;
	connector: WalletConnect;
}

export type DepositReturn = string | null;
