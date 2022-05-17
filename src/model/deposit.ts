import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigNumber, Contract } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { toBn } from 'evm-bn';
import * as qs from 'qs';
import { network as selectedNetwork } from './network';
import { ParaswapToken, stablecoins } from './token';
import { DepositableToken } from './types/depositTokens.types';
import { erc20abi, estimateGas, getProvider } from './wallet';

const protocol = 'aave-v2';
export const usdCoinSettingsKey = '@minke:usdcoin';
export const depositStablecoins = ['USDC', 'DAI', 'USDT'];
export const interestBearingTokens = ['amusdc', 'amdai', 'amusdt', 'ausdc', 'adai', 'ausdt', 'mnktest6'];

export const fetchAaveMarketData = async (): Promise<Array<AaveMarket>> => {
	const baseURL = `https://api.zapper.fi/v1/protocols/${protocol}/token-market-data`;
	const { zapperNetwork } = await selectedNetwork();
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const result = await fetch(`${baseURL}?&type=interest-bearing&api_key=${apiKey}&network=${zapperNetwork}`);
	const allMarkets: Array<AaveMarket> = await result.json();
	return allMarkets.filter(({ tokens }) => tokens.find(({ symbol }) => stablecoins.includes(symbol)));
};

export const fetchMStablePoolData = async (): Promise<MStablePoolData> => {
	const baseURL = 'https://api.mstable.org/pools';
	const result = await fetch(baseURL);
	return result.json();
};

export const depositableTokenToParaswapToken = (token: DepositableToken): ParaswapToken => {
	const { address, decimals, symbol } = token;
	return {
		address,
		decimals,
		symbol
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
	if (
		[
			'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase(),
			'0x0000000000000000000000000000000000000000'
		].includes(token.toLowerCase())
	) {
		return { isApproved: true };
	}
	const contract = new Contract(token, erc20abi, await getProvider());
	const amount: BigNumber = await contract.balanceOf(owner);
	const allowance: BigNumber = await contract.allowance(owner, spender);

	return { isApproved: allowance.gte(amount) };
};

export const zapperApprovalState = async (address: string, token: string): Promise<ApprovalState> => {
	const baseURL = `https://api.zapper.fi/v1/zap-in/interest-bearing/${protocol}/approval-state`;
	const apiKey = '96e0cc51-a62e-42ca-acee-910ea7d2a241';
	const { zapperNetwork } = await selectedNetwork();
	const result = await fetch(
		`${baseURL}?ownerAddress=${address}&sellTokenAddress=${token}&network=${zapperNetwork}&api_key=${apiKey}`
	);

	return result.json();
};

export const approvalTransaction = async (
	address: string,
	token: string,
	type = 'in',
	amount = ''
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
	if (amount) {
		tokenAmount = `&amount=${amount}`;
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
	const gasValue = gweiValue * 1000000000;
	const { zapperNetwork } = await selectedNetwork();
	const tokenAmount = formatUnits(toBn(amount, decimals), 'wei');
	const params = {
		maxFeePerGas: gasValue,
		maxPriorityFeePerGas: gasValue,
		ownerAddress: address.toLowerCase(),
		sellTokenAddress: token.toLowerCase(),
		poolAddress: interestBearingToken.toLowerCase(),
		payoutTokenAddress: interestBearingToken.toLowerCase(),
		slippagePercentage: 0.05,
		network: zapperNetwork,
		api_key: apiKey,
		sellAmount: tokenAmount
	};
	const result = await fetch(`${baseURL}?${qs.stringify(params)}`);

	return result.json();
};

export const usdCoin = async (): Promise<string> => {
	const coin = await AsyncStorage.getItem(usdCoinSettingsKey);
	return coin || 'USDC';
};

export const availableDepositProtocols: DepositProtocols = {
	mstable: {
		id: 'mstable',
		name: 'mStable',
		icon: 'MTA'
	},
	aave: {
		id: 'aave',
		name: 'Aave',
		icon: 'AAVE'
	}
};

export const fetchDepositProtocol = async (): Promise<DepositProtocol> => {
	const depositProtocol = await AsyncStorage.getItem('@depositProtocol');
	return depositProtocol ? availableDepositProtocols[depositProtocol] : availableDepositProtocols.mstable;
};

interface DepositProtocols {
	[key: string]: DepositProtocol;
}

export interface DepositProtocol {
	id: string;
	name: string;
	icon: string;
}

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
	balances: {
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

interface MStablePool {
	chain: string;
	pair: string;
	apy: number;
	averageApy: number;
	apyDetails: {
		yieldOnly: number;
	};
}
interface MStablePoolData {
	pools: MStablePool[];
}
