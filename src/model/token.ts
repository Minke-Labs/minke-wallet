import { BigNumber } from 'ethers';

export const paraswapTokens = async (): Promise<TokenResponse> => {
	const result = await fetch('https://apiv5.paraswap.io/tokens');
	return result.json();
};

export const getExchangePrice = async (srcToken: string, destToken: string | undefined): Promise<PriceRoute> => {
	const amount = '1000000000000000000';
	const result = await fetch(
		`https://apiv5.paraswap.io/prices?srcToken=${srcToken}&destToken=${destToken}&side=SELL&amount=${amount}`
	);
	return result.json();
};

export const ether: ParaswapToken = {
	symbol: 'ETH',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	img: 'https://img.paraswap.network/ETH.png',
	network: 1
};

export interface ParaswapToken {
	symbol: string;
	address: string;
	decimals: number;
	img: string;
	network: number;
}
export interface TokenResponse {
	tokens: Array<ParaswapToken>;
}

export interface PriceRoute {
	priceRoute: {
		srcAmount: string;
		destAmount: string;
		gasCostUSD: string;
		gasCost: string;
		srcUSD: string;
	};
}

export interface Quote {
	from: { [fromSymbol: string]: BigNumber };
	to: { [toSymbol: string]: BigNumber };
}
