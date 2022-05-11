import { DepositableToken } from '@models/types/depositTokens.types';

export interface DepositParams {
	gasless: boolean;
	address: string;
	privateKey: string;
	amount: string; // WEI
	minAmount: string; // WEI
	gasPrice: string; // WEI
	depositableToken: DepositableToken;
	biconomy: any;
}

export type DepositReturn = string | null;
