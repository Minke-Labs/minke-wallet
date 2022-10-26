import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from '@utils/logger';
import { convertTokens } from '@src/services/tokenConverter/tokenConverter';
import { network } from '@models/network';
import { COVALENT_API_KEY } from '@env';
import { Coin } from '@models/wallet';
import { BalanceApiResponse } from '@src/services/apis/covalent/covalent.types';

const instance = axios.create({
	baseURL: 'https://api.covalenthq.com/v1',
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
	params: {
		'quote-currency': 'USD',
		format: 'JSON',
		nft: false,
		'no-nft-fetch': true,
		key: COVALENT_API_KEY || process.env.COVALENT_API_KEY
	}
});

const useCovalentBalances = async (address: string) => {
	try {
		const { chainId, coingeckoPlatform } = await network();
		const { status, data } = await instance.get(`/${chainId}/address/${address}/balances_v2/`);
		if (status !== 200) Logger.sentry('Balances API failed');
		const {
			data: { items: apiTokens }
		}: BalanceApiResponse = data;

		const coinList = await AsyncStorage.getItem('@listCoins');
		let coins: Coin[] = JSON.parse(coinList!);
		coins = coins.filter(({ platforms }) => !!platforms[coingeckoPlatform]);
		const curated = coins.map(({ symbol }) => symbol.toLowerCase());
		const allTokens = await convertTokens({ source: 'covalent', tokens: apiTokens, chainId });

		const tokens = allTokens.filter((token) => curated.includes(token.symbol.toLowerCase()));
		return {
			tokens
		};
	} catch {
		return {
			tokens: []
		};
	}
};

export default useCovalentBalances;
