import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from '@utils/logger';
import isValidDomain from 'is-valid-domain';
import { AccountBalance, CovalentAavePool } from '@src/model/token';
import { convertTokens } from '@src/services/tokenConverter/tokenConverter';
import { network } from '@models/network';
import { COVALENT_API_KEY } from '@env';
import { depositStablecoins, interestBearingTokens, fetchDepositProtocol } from '@models/deposit';
import { fetchInterestBearingTokens } from '@models/depositTokens';
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

export const getAavePools = async (): Promise<CovalentAavePool[]> => {
	const { chainId } = await network();
	const { status, data } = await instance.get(`/${chainId}/networks/aave_v2/assets/`);
	if (status !== 200) Logger.sentry('AAVE Pools API failed');
	return data.data.items;
};

export const getTokenBalances = async (address: string): Promise<AccountBalance> => {
	const { chainId: networkId } = await network();
	const protocol = await fetchDepositProtocol();
	const { status, data } = await instance.get(`/${networkId}/address/${address}/balances_v2/`);
	if (status !== 200) Logger.sentry('Balances API failed');
	const {
		data: { items: apiTokens }
	}: BalanceApiResponse = data;

	const coinList = await AsyncStorage.getItem('@listCoins');
	const coins = JSON.parse(coinList!);
	const curated = coins.map(({ symbol }: { symbol: string }) => symbol.toLowerCase());
	const allTokens = await convertTokens({ source: 'covalent', tokens: apiTokens });

	let tokens = allTokens.filter((token) => curated.includes(token.symbol.toLowerCase()));
	const allInterestTokens = await fetchInterestBearingTokens(address, protocol.id);
	let interestTokens = allInterestTokens.flat();
	let [withdrawableTokens] = allInterestTokens;
	interestTokens = interestTokens.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001);
	withdrawableTokens = withdrawableTokens.filter(({ balanceUSD = 0 }) => balanceUSD >= 0.001);

	const depositableTokens = allTokens.filter(
		(token) => depositStablecoins.includes(token.symbol) && +token.balance! > 0
	);
	tokens = tokens.filter((token) => !interestBearingTokens.includes(token.symbol.toLowerCase()));
	tokens = tokens.filter(({ balance = '0' }) => +balance > 0);
	tokens = tokens.filter(({ name = '' }) => !isValidDomain(name));
	const walletBalance = tokens.map(({ balanceUSD = 0 }) => balanceUSD).reduce((a, b) => a + b, 0);
	const depositedBalance = interestTokens.map(({ balanceUSD = 0 }) => balanceUSD).reduce((a, b) => a + b, 0);
	const balance = walletBalance + depositedBalance;

	return {
		address,
		tokens,
		balance,
		depositedBalance,
		walletBalance,
		interestTokens,
		depositableTokens,
		withdrawableTokens
	};
};
