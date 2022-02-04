import { BigNumber } from 'ethers';
import { network } from './network';

export const paraswapTokens = async (): Promise<TokenResponse> => {
	const { chainId } = await network();
	const result = await fetch(`https://apiv5.paraswap.io/tokens/${chainId}`);
	return result.json();
};

export const getExchangePrice = async (
	srcToken: string,
	destToken: string,
	amount = '1000000000000000000'
): Promise<ExchangeRoute> => {
	const { chainId } = await network();
	const baseURL = 'https://apiv5.paraswap.io/prices';
	console.log(`${baseURL}?srcToken=${srcToken}&destToken=${destToken}&side=SELL&amount=${amount}&network=${chainId}`);
	const result = await fetch(
		`${baseURL}?srcToken=${srcToken}&destToken=${destToken}&side=SELL&amount=${amount}&network=${chainId}`
	);
	return result.json();
};

export const createTransaction = async ({
	srcToken,
	destToken,
	srcAmount,
	priceRoute,
	destAmount,
	userAddress
}: {
	srcToken: string;
	srcDecimals: number;
	destToken: string;
	destDecimals: number;
	srcAmount: string;
	destAmount: string;
	priceRoute: PriceRoute;
	userAddress: string;
}): Promise<TransactionData> => {
	const { chainId } = await network();
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ srcToken, destToken, srcAmount, priceRoute, userAddress, destAmount, side: 'SELL' })
	};

	const baseURL = `https://apiv5.paraswap.io/transactions/${chainId}`;
	const result = await fetch(baseURL, requestOptions);
	return result.json();
};

export const ether: ParaswapToken = {
	symbol: 'ETH',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	img: 'https://img.paraswap.network/ETH.png',
	network: 1
};

export const matic: ParaswapToken = {
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	img: 'https://img.paraswap.network/MATIC.png',
	network: 137,
	symbol: 'MATIC'
};

export const nativeTokens: NativeTokens = {
	ETH: ether,
	MATIC: matic
};

export interface NativeTokens {
	ETH: ParaswapToken;
	MATIC: ParaswapToken;
}

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

interface BestRoute {
	swaps: [{ swapExchanges: [{ exchange: string }] }];
}

export interface PriceRoute {
	srcToken: string;
	srcAmount: string;
	destToken: string;
	destAmount: string;
	gasCostUSD: string;
	gasCost: string;
	srcUSD: string;
	destUSD: string;
	srcDecimals: number;
	destDecimals: number;
	bestRoute: Array<BestRoute>;
}

export interface ExchangeRoute {
	priceRoute: PriceRoute;
	error: string;
}

export interface Quote {
	from: { [fromSymbol: string]: BigNumber };
	to: { [toSymbol: string]: BigNumber };
}

export interface TransactionData {
	chainId: number;
	data: string;
	from: string;
	gas: string;
	gasPrice: string;
	to: string;
	value: string;
	error: string;
}
