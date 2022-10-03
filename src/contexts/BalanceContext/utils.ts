import { MinkeToken } from '@models/types/token.types';
import { formatUnits } from 'ethers/lib/utils';

interface ZapperWallet {
	[key: string]: ZapperToken;
}

interface ZapperToken {
	address: string;
	balanceUSD: number;
	context: {
		balance: number;
		decimals: number;
		symbol: string;
		balanceRaw: string;
		price: number;
	};
	displayProps: {
		label: string;
	};
}

export type ZapperCustomEvents = 'balance' | 'end' | 'error';

const parseToken = ({ address, balanceUSD, context, displayProps }: ZapperToken): MinkeToken => {
	const { label: name } = displayProps;
	const { symbol, decimals, price, balanceRaw, balance: apiBalance } = context;
	const balance = formatUnits(balanceRaw, decimals);
	const usdValue = balance === apiBalance.toString() || !price ? balanceUSD : Number(balance) * price;
	return { name, address, symbol, decimals, balance, balanceUSD: usdValue };
};

const parseTokensFromWallet = (wallet: ZapperWallet): MinkeToken[] => {
	const tokens: MinkeToken[] = [];
	Object.keys(wallet).forEach((value) => {
		tokens.push(parseToken(wallet[value]));
	});
	return tokens;
};

export const parse = (wallet: ZapperWallet) => parseTokensFromWallet(wallet);
