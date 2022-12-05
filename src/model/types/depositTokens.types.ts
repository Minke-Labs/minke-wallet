export interface DepositableToken {
	address: string;
	symbol: string;
	decimals: number;
	chainId: number;
	interestBearingToken: {
		exchangeRateContract?: boolean; // mStable has an exchange rate
		// holds if the token will appear as the default USD token. Ex: imUSD will appear as USDC
		convertToDefaultUSD?: boolean;
		symbol: string;
		address: string;
		decimals: number;
		source: string;
	};
}

export interface DepositTokens {
	[networkId: string]: {
		[protocol: string]: DepositableToken[];
	};
}

export interface Stables {
	[networkId: string]: {
		[symbol: string]: {
			address: string;
			decimals: number;
			symbol: string;
			chainId: number;
		};
	};
}
