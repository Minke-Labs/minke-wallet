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
}

export type ZapperCustomEvents = 'balance' | 'end' | 'error';

const parseToken = ({ address, balanceUSD, context }: ZapperToken): MinkeToken => {
	const { symbol, decimals, balance } = context;
	return { address, symbol, balanceUSD, decimals, balance: balance.toString() };
};

const parseTokensFromWallet = (wallet: ZapperWallet): MinkeToken[] => {
	const tokens: MinkeToken[] = [];
	Object.keys(wallet).forEach((value) => {
		tokens.push(parseToken(wallet[value]));
	});
	return tokens;
};

export const parse = (wallet: ZapperWallet) => parseTokensFromWallet(wallet);
