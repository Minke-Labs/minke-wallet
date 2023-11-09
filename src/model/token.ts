import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import * as qs from 'qs';

import Logger from '@utils/logger';

import { ZERO_X_API_KEY } from '@env';
import { stables } from './depositTokens';
import { networks } from './network';
import { InvestmentToken, MinkeToken, MinkeTokenList } from './types/token.types';

export const stablecoins = ['USDC', 'DAI', 'USDT', 'BUSD'];

export const tokenList = async (chainId: number | undefined): Promise<MinkeToken[]> => {
	const selectedNetwork = Object.values(networks).find((n) => n.chainId === chainId);
	const { zapperNetwork, id, suggestedTokens } = selectedNetwork;
	try {
		const result = await fetch(
			`https://raw.githubusercontent.com/Minke-Labs/token-lists/main/${zapperNetwork}.tokenlist.json`
		);
		const { tokens } = await result.json();
		return tokens.map((t: MinkeTokenList) => {
			const { tags = [] } = t;
			let suggestedSlippage;
			if (tags.includes('slippage')) {
				suggestedSlippage = 0.3;
			}
			return { ...t, ...{ suggestedSlippage, chainId: selectedNetwork.chainId } };
		});
	} catch (error) {
		Logger.log('Error in the tokenList', error);
		const suggestedStables = Object.values(stables[id]);
		return [...suggestedStables, ...suggestedTokens];
	}
};

export interface ExchangeParams {
	address: string;
	srcToken: string;
	destToken: string;
	srcDecimals: number;
	destDecimals: number;
	side: 'SELL' | 'BUY';
	amount: string;
	quote?: boolean; // price or quote request
	chainId: number | undefined;
	slippage?: number;
}

interface QuoteParams {
	sellToken: string;
	buyToken: string;
	sellAmount?: string;
	buyAmount?: string;
	takerAddress: string;
	feeRecipient: string;
	affiliateAddress: string;
	buyTokenPercentageFee: number;
	skipValidation: boolean;
	excludedSources: string;
	slippagePercentage: number;
}

export const getExchangePrice = async ({
	address,
	srcToken,
	destToken,
	side,
	amount,
	srcDecimals,
	destDecimals,
	quote = false,
	chainId,
	slippage = 0.05
}: ExchangeParams): Promise<ExchangeRoute> => {
	const nw = Object.values(networks).find((n) => n.chainId === chainId);
	const { apiUrl0x, nativeToken } = nw;
	let sellToken = srcToken.toLowerCase();
	let buyToken = destToken.toLowerCase();
	const natives = ['0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000001010'];
	if (natives.includes(sellToken)) {
		sellToken = nativeToken.symbol;
	}
	if (natives.includes(buyToken)) {
		buyToken = nativeToken.symbol;
	}
	const quoteParams: QuoteParams = {
		sellToken,
		buyToken,
		takerAddress: address.toLowerCase(),
		feeRecipient: '0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'.toLowerCase(),
		affiliateAddress: '0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'.toLowerCase(),
		buyTokenPercentageFee: 0.0085,
		slippagePercentage: slippage,
		excludedSources: 'MeshSwap,Curve_V2,MDex,Balancer_V2,Balancer,DODO',
		skipValidation: true
	};

	if (side === 'SELL') {
		quoteParams.sellAmount = formatUnits(toBn(amount, srcDecimals), 'wei');
	} else {
		quoteParams.buyAmount = formatUnits(toBn(amount, destDecimals), 'wei');
	}
	const url = `${apiUrl0x}swap/v1/${quote ? 'quote' : 'price'}?${qs.stringify(quoteParams)}`;
	const headers = {
		'0x-api-key': (ZERO_X_API_KEY || process.env.ZERO_X_API_KEY)!
	};
	const result = await fetch(url, { headers });
	return result.json();
};

const fetchTokenHistory = async (query: string) => {
	if (!query) return null;

	const baseURL = 'https://www.coinbase.com/api/v2/assets/prices/';
	const result = await fetch(`${baseURL}${query.toLowerCase()}?base=USD`);
	return result.json();
};

export const getTokenHistory = async (token: MinkeToken) => {
	const { id, name, symbol } = token;
	let res = await fetchTokenHistory(id!);
	if (!res || res.errors) {
		res = await fetchTokenHistory(name!);
		if (!res || res.errors) {
			res = await fetchTokenHistory(symbol);
			if (!res || res.errors) {
				return null;
			}
			return res;
		}
		return res;
	}
	return res;
};

const fetchTokenData = async (query: string) => {
	if (!query) return null;

	const baseURL = 'https://api.coingecko.com/api/v3/coins/';
	const result = await fetch(
		`${baseURL}${query.toLowerCase()}?localization=false&tickers=false&community_data=false&developer_data=false`
	);

	return result.json();
};

export const getTokenData = async (token: MinkeToken) => {
	const { id, name, symbol } = token;
	let res = await fetchTokenData(id!);
	if (!res || res.errors) {
		res = await fetchTokenData(name!);
		if (!res || res.errors) {
			res = await fetchTokenData(symbol);
			if (!res || res.errors) {
				return null;
			}
			return res;
		}
		return res;
	}
	return res;
};

const fetchTokenVolume = async (query: string) => {
	if (!query) return null;

	const baseURL = 'https://api.coingecko.com/api/v3/coins/';
	const result = await fetch(`${baseURL}${query.toLowerCase()}/market_chart?vs_currency=usd&days=1&interval=daily`);
	return result.json();
};

export const getTokenVolume = async (token: MinkeToken) => {
	const { id, name, symbol } = token;
	let res = await fetchTokenVolume(id!);
	if (!res || res.errors) {
		res = await fetchTokenVolume(name!);
		if (!res || res.errors) {
			res = await fetchTokenVolume(symbol);
			if (!res || res.errors) {
				return null;
			}
			return res;
		}
		return res;
	}
	return res;
};

export const getTokenMarketCap = async (tokenIds: string): Promise<CoingeckoTokenMarketCap[]> => {
	const baseURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=false&ids=${tokenIds}`;
	const result = await fetch(baseURL);
	const toJson = await result.json();
	const error = !!toJson.status;
	if (error) {
		return [];
	}
	return toJson;
};

export const fetchTokensPriceChange = async (tokens: MinkeToken[]): Promise<InvestmentToken[]> => {
	const ids = tokens.map(({ id }) => id);
	const marketCaps = await getTokenMarketCap(ids.filter((id) => !!id).join(','));

	return tokens.map((t) => ({
		...t,
		...{ perc: marketCaps.find(({ id }) => id === t.id)?.price_change_percentage_24h }
	}));
};

export const ether: MinkeToken = {
	symbol: 'ETH',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	chainId: 1
};

export const matic: MinkeToken = {
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	symbol: 'MATIC',
	chainId: 137
};

export const bnb: MinkeToken = {
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	symbol: 'BNB',
	chainId: 56
};

export const nativeTokens: NativeTokens = {
	ETH: ether,
	MATIC: matic,
	BNB: bnb
};

export interface NativeTokens {
	ETH: MinkeToken;
	MATIC: MinkeToken;
	BNB: MinkeToken;
}

export interface TokenResponse {
	tokens: Array<MinkeTokenList>;
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
	tokenTransferProxy: string;
	contractAddress: string;
	side: string;
}

interface ExchangeError {
	code: string;
	field: string;
	reason: string;
}

export interface ExchangeRoute {
	message?: string;
	code?: number;
	reason?: string;
	validationErrors?: ExchangeError[]; // error fields
	allowanceTarget: string;
	buyAmount: string;
	buyTokenAddress: string;
	buyTokenToEthRate: string;
	chainId: number;
	estimatedGas: string;
	estimatedPriceImpact: string;
	gas: string;
	gasPrice: string;
	minimumProtocolFee: string;
	price: string;
	protocolFee: string;
	sellAmount: string;
	sellTokenAddress: string;
	sellTokenToEthRate: string;
	value: string;
	orders: [{ source: string }];
	guaranteedPrice?: string;
	data?: string;
	to?: string;
}

export interface Quote {
	from: { [fromSymbol: string]: BigNumber };
	to: { [toSymbol: string]: BigNumber };
	gasless: boolean; // holds if the transaction will be gasless
}

export interface AccountBalance {
	address: string;
	balance: number; // total
	depositedBalance: number; // deposited amount
	walletBalance: number; // available in the wallet (not deposited)
	stablecoinsBalance: number; // USDT, USDC, DAI usd balances sum
	tokens: MinkeToken[];
	stablecoins: MinkeToken[];
	interestTokens: MinkeToken[];
	loading: boolean;
}

export interface CovalentAavePool {
	underlying: {
		contract_address: string;
		contract_ticker_symbol: string;
	};
	atoken: {
		contract_address: string;
		contract_ticker_symbol: string;
	};
	supply_apy: number;
}

interface CoingeckoTokenMarketCap {
	id: string;
	market_cap: string;
	errors?: string[];
	price_change_percentage_24h: number;
}
