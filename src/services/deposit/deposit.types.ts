export interface DepositParams {
	gasless: boolean;
	address: string;
	privateKey: string;
	amount: string; // WEI
	minAmount: string; // WEI
	gasPrice: string; // WEI
	tokenSymbol: string;
	biconomy: any;
}

export type DepositReturn = {
	hash: string;
	wait: (transactionHash: string, confirmations?: number, timeout?: number) => Promise<TransactionReceipt>;
};
