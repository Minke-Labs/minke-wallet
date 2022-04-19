import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from '@utils/logger';
import { AccountBalance } from '@src/model/token';
import { convertTokens } from '@src/services/tokenConverter/tokenConverter';
import { network } from '@models/network';
import { COVALENT_API_KEY } from '@env';
import { depositStablecoins, interestBearingTokens } from '@models/deposit';
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
	const { status, data } = await instance.get(`/${networkId}/address/${address}/balances_v2/`);
	if (status !== 200) Logger.sentry('Balances API failed');
	const {
		data: { items: apiTokens }
	}: BalanceApiResponse = data;

	const coinList = await AsyncStorage.getItem('@listCoins');
	const coins = JSON.parse(coinList!);
	const curated = coins.map(({ symbol }: { symbol: string }) => symbol.toLowerCase());
	const minkeTokens = await convertTokens({ source: 'covalent', tokens: apiTokens });
	let tokens = minkeTokens.filter((token) => curated.includes(token.symbol.toLowerCase()));
	const interestTokens = tokens.filter((token) => interestBearingTokens.includes(token.symbol.toLowerCase()));
	const depositableTokens = tokens.filter((token) => depositStablecoins.includes(token.symbol));
	tokens = tokens.filter((token) => !interestBearingTokens.includes(token.symbol.toLowerCase()));
	const walletBalance = tokens.map(({ balanceUSD }) => balanceUSD).reduce((a, b) => a + b, 0);
	const depositedBalance = interestTokens.map(({ balance }) => Number(balance)).reduce((a, b) => a + b, 0);
	const balance = walletBalance + depositedBalance;

	return { address, tokens, balance, depositedBalance, walletBalance, interestTokens, depositableTokens };
};
