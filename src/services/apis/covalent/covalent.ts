import axios from 'axios';
import Logger from '@utils/logger';
import { CovalentAavePool } from '@src/model/token';
import { network } from '@models/network';
import { COVALENT_API_KEY } from '@env';

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

export const getAavePools = async (): Promise<CovalentAavePool[]> => {
	const { chainId } = await network();
	const { status, data } = await instance.get(`/${chainId}/networks/aave_v2/assets/`);
	if (status !== 200) Logger.sentry('AAVE Pools API failed');
	return data.data.items;
};
