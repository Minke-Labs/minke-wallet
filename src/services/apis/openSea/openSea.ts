import axios from 'axios';
import { OPENSEA_API_KEY, ALCHEMY_API_KEY_MATIC } from '@env';
import { Alchemy, Network } from 'alchemy-sdk';
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

const customCollections: { [key: string]: { slug: string; name: string } } = {
	'0x33b01c2730cea224c7825be8c07c34250bad612e': {
		slug: 'minkers',
		name: 'Minkers'
	},
	'0x4051fcd217f76c7a8d07f83a870443027dbab3f7': {
		slug: 'cocktailbarpunks',
		name: 'CocktailBarPunks'
	},
	'0x2953399124f0cbb46d2cbacd8a89cf0599974963': {
		slug: 'opensea-collections',
		name: 'OpenSea Collections'
	}
};

export const getAssets = async (owner: string): Promise<NFT[]> => {
	const settings = {
		apiKey: ALCHEMY_API_KEY_MATIC || process.env.ALCHEMY_API_KEY_MATIC,
		network: Network.MATIC_MAINNET
	};
	const alchemy = new Alchemy(settings);
	const { ownedNfts } = await alchemy.nft.getNftsForOwner(owner, {
		omitMetadata: false,
		contractAddresses: Object.keys(customCollections)
	});

	const assets: NFT[] = ownedNfts.map(({ tokenId, media, title, description, contract }) => {
		const [data] = media;
		const { name, slug } = customCollections[contract.address];
		return {
			id: tokenId,
			image_thumbnail_url: data.gateway,
			image_url: data.gateway,
			name: title,
			permalink: `https://opensea.io/assets/matic/${contract.address}/${tokenId}`,
			collection: {
				description,
				name,
				image_url: data.gateway,
				slug
			},
			last_sale: null,
			stats: {
				floor_price: 0,
				symbol: 'MATIC'
			}
		};
	});

	const params = {
		owner,
		order_direction: 'desc',
		limit: 50,
		include_orders: false
	};

	const { status, data } = await instance.get(`/assets?${qs.stringify(params)}`);
	if (status !== 200) Logger.sentry('AAVE Pools API failed');
	assets.push(data.assets);
	let cursor = data.next;
	while (cursor) {
		// eslint-disable-next-line no-await-in-loop
		const { status: st, data: dt } = await instance.get(`/assets?${qs.stringify({ ...params, ...{ cursor } })}`);
		if (st !== 200) Logger.sentry('AAVE Pools API failed. Cursor', cursor);
		assets.push(dt.assets);
		cursor = dt.next;
	}

	return assets.flat();
};

export const getCollectionStats = async (slug: string): Promise<Stats> => {
	const res = await axios.get(`https://api.opensea.io/api/v1/collection/${slug}/stats`);
	return res.data.stats;
};
