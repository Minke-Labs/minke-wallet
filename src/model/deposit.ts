import AsyncStorage from '@react-native-async-storage/async-storage';
import { network as selectedNetwork } from './network';
import { ParaswapToken, stablecoins } from './token';

const protocol = 'aave-v2';
export const usdCoinSettingsKey = '@minke:usdcoin';
export const depositStablecoins = ['USDC', 'DAI', 'USDT'];

export const fetchAaveMarketData = async (): Promise<Array<AaveMarket>> => {
	const baseURL = `https://api.zapper.fi/v1/protocols/${protocol}/token-market-data`;
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

export const aaveDeposits = async (address: string): Promise<AaveBalances> => {
	const baseURL = `https://api.zapper.fi/v1/apps/${protocol}/balances`;
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const { zapperNetwork } = await selectedNetwork();
	const result = await fetch(`${baseURL}?addresses%5B%5D=${address}&network=${zapperNetwork}&api_key=${apiKey}`);
	return result.json();
};

export const usdCoin = async (): Promise<string> => {
	const coin = await AsyncStorage.getItem(usdCoinSettingsKey);
	return coin || 'USDC';
};

export interface AaveBalances {
	[key: string]: {
		products: [
			{
				label: string;
				assets: [AaveAsset];
			}
		];
		meta: [
			{
				label: string;
				value: number;
				type: string;
			}
		];
	};
}

interface AaveAsset {
	type: string;
	address: string;
	network: string;
	appId: string;
	groupId: string;
	symbol: string;
	decimals: number;
	supply: number;
	price: number;
	pricePerShare: number;
	tokens: [AaveBaseToken];
	dataProps: {
		apy: number;
	};
	displayProps: {
		label: string;
		secondaryLabel: {
			type: string;
			value: number;
		};
		tertiaryLabel: {
			type: 'pct';
			value: number;
		};
		images: [string];
		statsItems: [
			{
				label: string;
				value: {
					type: string;
					value: number;
				};
			}
		];
	};
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
}

interface AaveBaseToken {
	type: string;
	network: string;
	address: string;
	decimals: number;
	symbol: string;
	price: number;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
}

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
