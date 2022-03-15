import axios from 'axios';
import { AccountBalance } from '@src/model/token';
import { convertTokens } from '@src/services/tokenConverter/tokenConverter';
import coins from '@helpers/coins.json';
import { network } from '@models/network';
import { COVALENT_API_KEY } from '@env';
import { interestBearingTokens } from '@models/deposit';
import { BalanceApiResponse } from './covalent.types';

const instance = axios.create({
	baseURL: 'https://api.covalenthq.com/v1',
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' },
	params: {
		'quote-currency': 'USD',
		format: 'JSON',
		nft: false,
		'no-nft-fetch': true,
		key: COVALENT_API_KEY || process.env.COVALENT_API_KEY
	}
});

export const getTokenBalances = async (address: string): Promise<AccountBalance> => {
	const { chainId: networkId } = await network();
	const response = await instance.get(`/${networkId}/address/${address}/balances_v2/`);

	const {
		data: { items: apiTokens }
	}: BalanceApiResponse = response.data;

	const curated = coins.map(({ symbol }) => symbol.toLowerCase());
	const minkeTokens = convertTokens({ source: 'covalent', tokens: apiTokens });
	let tokens = minkeTokens.filter((token) => curated.includes(token.symbol.toLowerCase()));
	const interestTokens = tokens.filter((token) => interestBearingTokens.includes(token.symbol.toLowerCase()));
	tokens = tokens.filter((token) => !interestBearingTokens.includes(token.symbol.toLowerCase()));
	const walletBalance = tokens.map(({ balanceUSD }) => balanceUSD).reduce((a, b) => a + b, 0);
	const depositedBalance = interestTokens.map(({ balanceUSD }) => balanceUSD).reduce((a, b) => a + b, 0);
	const balance = walletBalance + depositedBalance;

	return { address, tokens, balance, depositedBalance, walletBalance };
};