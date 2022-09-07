import WalletConnect from '@walletconnect/client';
import { BigNumber } from 'ethers';

export interface WithdrawParams {
	gasless: boolean;
	address: string;
	privateKey: string | null;
	amount: string; // WEI
	minAmount: string; // WEI
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
	biconomy: any;
	token: string;
	interestBearingToken: string;
	walletConnect: boolean;
	connector: WalletConnect;
}
export type WithdrawReturn = string | null;
