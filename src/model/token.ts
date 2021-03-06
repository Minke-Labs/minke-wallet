import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import * as qs from 'qs';
import { network, networks } from './network';

export const stablecoins = ['USDC', 'DAI', 'USDT', 'BUSD', 'TUSD', 'UST'];
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
	'YFI'
];

export const paraswapTokens = async (): Promise<TokenResponse> => {
	const { chainId } = await network();
	const result = await fetch(`https://apiv5.paraswap.io/tokens/${chainId}`);
	return result.json();
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
	if (chainId === networks.matic.chainId) {
		if (sellToken === '0x0000000000000000000000000000000000001010') {
			sellToken = 'MATIC';
		}

		if (buyToken === '0x0000000000000000000000000000000000001010') {
			buyToken = 'MATIC';
		}
	}
	const quoteParams: QuoteParams = {
		sellToken,
		buyToken,
		takerAddress: address.toLowerCase(),
		feeRecipient: '0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'.toLowerCase(),
		affiliateAddress: '0xe0ee7fec8ec7eb5e88f1dbbfe3e0681cc49f6499'.toLowerCase(),
		buyTokenPercentageFee: 0.005,
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

export const getTokenMarketCap = async (tokenName: string) => {
	const baseURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=false&ids=${tokenName}`;
	const result = await fetch(baseURL);
	const toJson = await result.json();
	const mktCapArr = toJson.map((item: any) => ({ id: item.id, market_cap: item.market_cap }));
	const mktCap = mktCapArr.find((item: any) => item.id === tokenName.toLowerCase());
	return mktCap.market_cap;
};

export const createTransaction = async ({
	srcToken,
	destToken,
	srcAmount,
	priceRoute,
	destAmount,
	userAddress,
	permit,
	gasPrice,
	side
}: {
	srcToken: string;
	srcDecimals: number;
	destToken: string;
	destDecimals: number;
	srcAmount: string;
	destAmount: string;
	priceRoute: PriceRoute;
	userAddress: string;
	permit?: string;
	gasPrice?: number;
	side: string;
}): Promise<TransactionData> => {
	const { chainId } = await network();
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			srcToken,
			destToken,
			srcAmount: side === 'BUY' ? undefined : srcAmount,
			priceRoute,
			userAddress,
			destAmount: side === 'SELL' ? undefined : destAmount,
			side,
			permit,
			slippage: 30, // 3% (0.3 * 100 = 30)
			eip1559: true
		})
	};

	const baseURL = `https://apiv5.paraswap.io/transactions/${chainId}?gasPrice=${gasPrice}`;
	const result = await fetch(baseURL, requestOptions);
	return result.json();
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

export interface AccountBalance {
	address: string;
	balance: number; // total
	depositedBalance: number; // deposited amount
	walletBalance: number; // available in the wallet (not deposited)
	tokens: MinkeToken[];
	interestTokens: MinkeToken[];
	depositableTokens: MinkeToken[];
	withdrawableTokens: MinkeToken[];
}

export interface CovalentToken {
	contract_decimals: number;
	contract_name: string;
	contract_ticker_symbol: string;
	contract_address: string;
	logo_url: string;
	last_transferred_at: string;
	type: string;
	balance: string;
	balance_24h: string;
	quote_rate: number;
	quote_rate_24h: number;
	quote: number;
	quote_24h: number;
	nft_data: null;
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
