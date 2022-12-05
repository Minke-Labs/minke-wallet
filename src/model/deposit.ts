import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigNumber, Contract } from 'ethers';
import { networks, selectedNetwork } from './network';
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
	const { address, decimals, symbol, chainId } = token;
	return {
		address,
		decimals,
		symbol,
		chainId
	};
};

export const approvalState = async (
	owner: string,
	token: string,
	spender: string,
	networkId: string
): Promise<ApprovalState> => {
	if (
		[
			'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase(),
			'0x0000000000000000000000000000000000000000'
		].includes(token.toLowerCase())
	) {
		return { isApproved: true };
	}
	const contract = new Contract(token, erc20abi, getProvider(networkId));
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
		icon: 'MTA',
		chainIds: [networks.matic.chainId]
	},
	aave: {
		id: 'aave',
		name: 'Aave',
		icon: 'AAVE',
		chainIds: [networks.matic.chainId, networks.mainnet.chainId]
	}
};

export const fetchDepositProtocol = async (): Promise<DepositProtocol> => {
	const { chainId } = await selectedNetwork();
	if (chainId === networks.mainnet.chainId) {
		return availableDepositProtocols.aave;
	}

	return availableDepositProtocols.mstable;
};

interface DepositProtocols {
	[key: string]: DepositProtocol;
}

export interface DepositProtocol {
	id: 'aave' | 'mstable';
	name: string;
	icon: string;
	chainIds: number[];
}

export interface ApprovalState {
	isApproved: boolean;
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
