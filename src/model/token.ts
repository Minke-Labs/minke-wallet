import { BigNumber } from 'ethers';

const network = 3; // ropsten
export const paraswapTokens = async (): Promise<TokenResponse> => {
	const result = await fetch(`https://apiv5.paraswap.io/tokens/${network}`);
	return result.json();
};

export const getExchangePrice = async (
	srcToken: string,
	destToken: string,
	amount = '1000000000000000000'
): Promise<PriceRoute> => {
	const baseURL = 'https://apiv5.paraswap.io/prices';
	const result = await fetch(
		`${baseURL}?srcToken=${srcToken}&destToken=${destToken}&side=SELL&amount=${amount}&network=${network}`
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
	error: string;
}

export interface Quote {
	from: { [fromSymbol: string]: BigNumber };
	to: { [toSymbol: string]: BigNumber };
}
