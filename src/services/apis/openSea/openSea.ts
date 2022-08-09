import axios from 'axios';
import { OPENSEA_API_KEY } from '@env';
import * as qs from 'qs';
import { NFT, Stats } from '@models/types/nft.types';
import Logger from '@utils/logger';

const instance = axios.create({
	baseURL: 'https://api.opensea.io/api/v1',
	timeout: 10000,
	headers: {
		Accept: 'application/json',
		'X-API-KEY': OPENSEA_API_KEY || (process.env.OPENSEA_API_KEY as string)
	}
});

export const getAssets = async (owner: string): Promise<NFT[]> => {
	const params = {
		owner,
		order_direction: 'desc',
		include_orders: false
	};

	const { status, data } = await instance.get(`/assets?${qs.stringify(params)}`);
	if (status !== 200) Logger.sentry('AAVE Pools API failed');

	return data.assets;
};

export const getCollectionStats = async (slug: string): Promise<Stats> => {
	const res = await axios.get(`https://api.opensea.io/api/v1/collection/${slug}/stats`);
	return res.data.stats;
};
