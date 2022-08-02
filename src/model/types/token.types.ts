export interface MinkeToken {
	symbol: string;
	decimals: number;
	address: string;
	id?: string;
	name?: string;
	image?: string; // TODO: @Marcos - Remove this field
	balance?: string;
	balanceUSD?: number;
	interestBearingToken?: {
		// withdraw: tokens that can be deposited (DAI, USDC...) will have this field pointing to
		// the interest bearing token address (amDAI, amUSDC...)
		address: string;
		symbol: string;
		decimals: number;
		source: string;
	};
}
