import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import * as qs from 'qs';
import { stables } from './depositTokens';
import { network, networks } from './network';
import { MinkeToken, InvestmentToken } from './types/token.types';

export const stablecoins = ['USDC', 'DAI', 'USDT', 'BUSD'];
export const exchangebleTokens = [
	'ETH',
	'MATIC',
	'USDT',
	'USDC',
	'WETH',
	'WBTC',
	'CRO',
	'DAI',
	'LINK',
	'UNI',
	'MANA',
	'FRAX',
	'AAVE',
	'COMP',
	'CEL',
	'CRV',
	'SUSHI',
	'BAL',
	'YFI',
	'QUICK',
	'PolyDoge'
];

export const paraswapTokens = async (): Promise<TokenResponse> => {
	const { chainId, id, suggestedTokens } = await network();
	try {
		const result = await fetch(`https://apiv5.paraswap.io/tokens/${chainId}`);
		return await result.json();
	} catch {
		const suggestedStables = Object.values(stables[id]);
		return { tokens: [...suggestedStables, ...suggestedTokens] };
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
	quote = false
}: ExchangeParams): Promise<ExchangeRoute> => {
	const { apiUrl0x, chainId } = await network();
	let sellToken = srcToken.toLowerCase();
	let buyToken = destToken.toLowerCase();
	const natives = ['0x0000000000000000000000000000000000000000', '0x0000000000000000000000000000000000001010'];
	if (natives.includes(sellToken)) {
		if (chainId === networks.matic.chainId) {
			sellToken = 'MATIC';
		}

		if (chainId === networks.mainnet.chainId) {
			sellToken = 'ETH';
		}
	}
	if (natives.includes(buyToken)) {
		if (chainId === networks.matic.chainId) {
			buyToken = 'MATIC';
		}

		if (chainId === networks.mainnet.chainId) {
			buyToken = 'ETH';
		}
	}
	const quoteParams: QuoteParams = {
		sellToken,
		buyToken,
		takerAddress: address.toLowerCase(),
		feeRecipient: '0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'.toLowerCase(),
		affiliateAddress: '0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'.toLowerCase(),
		buyTokenPercentageFee: 0.005,
		slippagePercentage: 0.03,
		excludedSources: 'MeshSwap,Curve_V2',
		skipValidation: true
	};

	if (side === 'SELL') {
		quoteParams.sellAmount = formatUnits(toBn(amount, srcDecimals), 'wei');
	} else {
		quoteParams.buyAmount = formatUnits(toBn(amount, destDecimals), 'wei');
	}

	const url = `${apiUrl0x}swap/v1/${quote ? 'quote' : 'price'}?${qs.stringify(quoteParams)}`;
	const result = await fetch(url);
	return result.json();
};

export const getTokenHistory = async (token = 'ethereum') => {
	const baseURL = 'https://www.coinbase.com/api/v2/assets/prices/';
	const result = await fetch(`${baseURL}${token.toLowerCase()}?base=USD`);
	return result.json();
};

export const getTokenData = async (token = 'ethereum') => {
	const baseURL = 'https://api.coingecko.com/api/v3/coins/';
	const result = await fetch(
		`${baseURL}${token.toLowerCase()}?localization=false&tickers=false&community_data=false&developer_data=false`
	);
	return result.json();
};

export const getTokenVolume = async (token: string) => {
	const baseURL = 'https://api.coingecko.com/api/v3/coins/';
	const result = await fetch(`${baseURL}${token.toLowerCase()}/market_chart?vs_currency=usd&days=1&interval=daily`);
	return result.json();
};

export const getTokenMarketCap = async (tokenIds: string): Promise<CoingeckoTokenMarketCap[]> => {
	const baseURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=false&ids=${tokenIds}`;
	const result = await fetch(baseURL);
	const toJson = await result.json();
	return toJson;
};

export const fetchTokensPriceChange = async (tokens: MinkeToken[]): Promise<InvestmentToken[]> => {
	const ids = tokens.map(({ id }) => id);
	const marketCaps = await getTokenMarketCap(ids.join(','));

	return tokens.map((t) => ({
		...t,
		...{ perc: marketCaps.find(({ id }) => id === t.id)?.price_change_percentage_24h }
	}));
};

export const ether: MinkeToken = {
	symbol: 'ETH',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18
};

export const matic: MinkeToken = {
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	symbol: 'MATIC'
};

export const nativeTokens: NativeTokens = {
	ETH: ether,
	MATIC: matic
};

export interface NativeTokens {
	ETH: MinkeToken;
	MATIC: MinkeToken;
}

export interface TokenResponse {
	tokens: Array<MinkeToken>;
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
	withdrawableTokens: MinkeToken[];
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
