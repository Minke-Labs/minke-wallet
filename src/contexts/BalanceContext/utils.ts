import { MinkeToken } from '@models/types/token.types';

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
	};
	displayProps: {
		label: string;
	};
}

export type ZapperCustomEvents = 'balance' | 'end' | 'error';

const parseToken = ({ address, balanceUSD, context, displayProps }: ZapperToken): MinkeToken => {
	const { label: name } = displayProps;
	const { symbol, decimals, balance } = context;
	return { name, address, symbol, balanceUSD, decimals, balance: balance.toString() };
};

const parseTokensFromWallet = (wallet: ZapperWallet): MinkeToken[] => {
	const tokens: MinkeToken[] = [];
	Object.keys(wallet).forEach((value) => {
		tokens.push(parseToken(wallet[value]));
	});
	return tokens;
};

export const parse = (wallet: ZapperWallet) => parseTokensFromWallet(wallet);
