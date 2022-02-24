import { network as selectedNetwork } from './network';
import { ParaswapToken, stablecoins } from './token';

export const fetchAaveMarketData = async (): Promise<Array<AaveMarket>> => {
	const baseURL = 'https://api.zapper.fi/v1/protocols/aave-v2/token-market-data';
	const { zapperNetwork } = await selectedNetwork();
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const result = await fetch(`${baseURL}?&type=interest-bearing&api_key=${apiKey}&network=${zapperNetwork}`);
	const allMarkets: Array<AaveMarket> = await result.json();

	return allMarkets.filter(({ tokens }) => tokens.find(({ symbol }) => stablecoins.includes(symbol)));
};

export const aaveMarketTokenToParaswapToken = ({ tokens }: AaveMarket): ParaswapToken => {
	const { address, decimals, symbol, tokenImageUrl, network } = tokens[0];
	return {
		address,
		decimals,
		symbol,
		img: tokenImageUrl,
		network: +network
	};
};

export interface AaveToken {
	type: string;
	network: string;
	address: string;
	decimals: number;
	symbol: string;
	price: number;
	reserve: number;
	tokenImageUrl: string;
}

export interface AaveMarket {
	type: string;
	network: string;
	address: string;
	symbol: string;
	label: string;
	decimals: number;
	img: string;
	price: number;
	appId: string;
	liquidity: number;
	supply: number;
	borrowApy: number;
	supplyApy: number;
	tokens: [AaveToken];
	appName: string;
	appImageUrl: string;
	protcolDisplay: string;
}
