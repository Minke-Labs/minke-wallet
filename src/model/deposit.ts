import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigNumber, Contract } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import { network as selectedNetwork } from './network';
import { ParaswapToken, stablecoins } from './token';
import { erc20abi, estimateGas, getProvider } from './wallet';

const protocol = 'aave-v2';
export const usdCoinSettingsKey = '@minke:usdcoin';
export const depositStablecoins = ['USDC', 'DAI', 'USDT'];
export const interestBearingTokens = ['amusdc', 'amdai', 'amusdt'];

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

export const approvalState = async (owner: string, token: string, spender: string): Promise<ApprovalState> => {
	const contract = new Contract(token, erc20abi, await getProvider());
	const amount: BigNumber = await contract.balanceOf(owner);
	const allowance: BigNumber = await contract.allowance(owner, spender);

	return { isApproved: allowance.gte(amount) };
};

export const approvalTransaction = async (
	address: string,
	token: string,
	type = 'in',
	amount = '',
	decimals = 18
): Promise<ApprovalTransaction> => {
	const baseURL = `https://api.zapper.fi/v1/zap-${type}/interest-bearing/${protocol}/approval-transaction`;
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const { zapperNetwork } = await selectedNetwork();
	const {
		result: { FastGasPrice: gasPrice, suggestBaseFee }
	} = await estimateGas();
	const baseFee = +suggestBaseFee * 1000000000;
	const gasValue = +gasPrice * 1000000000;
	const gas = `&maxFeePerGas=${baseFee + gasValue}&maxPriorityFeePerGas=${gasValue}`;
	let tokenAmount;
	if (amount && decimals) {
		tokenAmount = `&amount=${formatUnits(toBn(amount, decimals), 'wei')}`;
	} else {
		tokenAmount = '';
	}
	const addresses = `ownerAddress=${address}&sellTokenAddress=${token}`;
	const result = await fetch(
		`${baseURL}?${addresses}&network=${zapperNetwork}&api_key=${apiKey}${gas}${tokenAmount}`
	);

	return result.json();
};

export const depositTransaction = async ({
	address,
	token,
	decimals,
	amount,
	interestBearingToken,
	gweiValue
}: {
	address: string;
	token: string;
	decimals: number;
	interestBearingToken: string;
	amount: string;
	gweiValue: number;
}): Promise<DepositTransaction> => {
	const baseURL = `https://api.zapper.fi/v1/zap-in/interest-bearing/${protocol}/transaction`;
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const { zapperNetwork } = await selectedNetwork();
	const gasValue = gweiValue * 1000000000;
	const gas = `&maxFeePerGas=${gasValue}&maxPriorityFeePerGas=${gasValue}`;
	const addresses = `&ownerAddress=${address}&sellTokenAddress=${token}`;
	const poolAddresses = `&poolAddress=${interestBearingToken}&payoutTokenAddress=${interestBearingToken}`;
	const slippage = '&slippagePercentage=0.05';
	const network = `&network=${zapperNetwork}&api_key=${apiKey}${gas}`;
	const tokenAmount = formatUnits(toBn(amount, decimals), 'wei');
	const result = await fetch(
		`${baseURL}?&sellAmount=${tokenAmount}${addresses}${poolAddresses}${slippage}${network}`
	);

	return result.json();
};

export const usdCoin = async (): Promise<string> => {
	const coin = await AsyncStorage.getItem(usdCoinSettingsKey);
	return coin || 'USDC';
};

export interface DepositTransaction {
	buyTokenAddress: string;
	data: string;
	from: string;
	minTokens: string;
	sellTokenAddress: string;
	sellTokenAmount: string;
	to: string;
	value: string;
	gas: string;
	maxFeePerGas: string;
	maxPriorityFeePerGas: string;
}

export interface ApprovalTransaction {
	gasPrice: string;
	maxFeePerGas: string;
	maxPriorityFeePerGas: string;
	from: string;
	to: string;
	value: string;
	gas: string;
	data: string;
}

export interface ApprovalState {
	isApproved: boolean;
}

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

export interface AaveAsset {
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
