export interface WithdrawParams {
	gasless: boolean;
	address: string;
	privateKey: string;
	amount: string; // WEI
	minAmount: string; // WEI
	gasPrice: string; // WEI
	biconomy: any;
	token: string;
	interestBearingToken: string;
}
export type WithdrawReturn = string | null;
