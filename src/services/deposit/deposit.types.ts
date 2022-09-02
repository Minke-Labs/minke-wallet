import { DepositableToken } from '@models/types/depositTokens.types';
import WalletConnect from '@walletconnect/client';
import { BigNumber } from 'ethers';

export interface DepositParams {
	gasless: boolean;
	address: string;
	privateKey: string | null;
	amount: string; // WEI
	minAmount: string; // WEI
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber; // WEI
	depositableToken: DepositableToken;
	biconomy: any;
	walletConnect: boolean;
	connector: WalletConnect;
}

export type DepositReturn = string | null;
