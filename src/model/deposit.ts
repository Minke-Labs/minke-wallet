import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigNumber, Contract } from 'ethers';
import { network as selectedNetwork, networks } from './network';
import { MinkeToken } from './types/token.types';
import { DepositableToken } from './types/depositTokens.types';
import { erc20abi, getProvider } from './wallet';

export const usdCoinSettingsKey = '@minke:usdcoin';
export const depositStablecoins = ['USDC', 'DAI', 'USDT'];
export const interestBearingTokensAndProtocols: { [key: string]: string } = {
	amusdc: 'AAVE',
	amdai: 'AAVE',
	amusdt: 'AAVE',
	ausdc: 'AAVE',
	adai: 'AAVE',
	ausdt: 'AAVE',
	'mv-imusd': 'mStable'
};
export const interestBearingTokens = Object.keys(interestBearingTokensAndProtocols);

export const fetchMStablePoolData = async (): Promise<MStablePoolData> => {
	const baseURL = 'https://api.mstable.org/pools';
	const result = await fetch(baseURL);
	return result.json();
};

export const depositableTokenToMinkeToken = (token: DepositableToken): MinkeToken => {
	const { address, decimals, symbol } = token;
	return {
		address,
		decimals,
		symbol
	};
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
	const { chainId } = await selectedNetwork();
	if (chainId === networks.mainnet.chainId) {
		return availableDepositProtocols.aave;
	}

	return depositProtocol ? availableDepositProtocols[depositProtocol] : availableDepositProtocols.mstable;
};

interface DepositProtocols {
	[key: string]: DepositProtocol;
}

export interface DepositProtocol {
	id: 'aave' | 'mstable';
	name: string;
	icon: string;
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
