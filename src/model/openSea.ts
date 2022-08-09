/* eslint-disable max-len */
import axios from 'axios';
import { OPENSEA_API_KEY } from '@env';

interface SendRequest {
	collectionSlug: string;
}

export const sendGetRequest = async ({ collectionSlug }: SendRequest) => {
	const res = await axios.get(`https://api.opensea.io/api/v1/collection/${collectionSlug}`);
	return res.data;
};

export const getCollectionInfo = async ({ slug }: { slug: string }) => {
	const res = await sendGetRequest({ collectionSlug: slug });
	const resObj = ({
		image: res.collection.featured_image_url,
		name: res.collection.name,
		desc: res.collection.description
	});
	return resObj;
};

export const getCollectionStats = async (slug: string) => {
	const res = await axios.get(`https://api.opensea.io/api/v1/collection/${slug}/stats`);
	return res.data.stats;
};

export const getAssets = async () => {
	const options = {
		headers: {
			Accept: 'application/json',
			'X-API-KEY': OPENSEA_API_KEY || process.env.OPENSEA_API_KEY as string
		}
	};

	const walletAddress = '0x6391DD8C71E2dB08ba3CCf3e3911423fF41Fa8ed';

	const res = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&include_orders=false`, options);

	const assets = res.data.assets.map((asset: any) => ({
		name: asset.name,
		id: asset.id,
		image: asset.image_url,
		thumb: asset.image_thumbnail_url,
		permalink: asset.permalink,
		last_sale: asset.last_sale,
		collection: {
			name: asset.collection.name,
			desc: asset.collection.description,
			slug: asset.collection.slug,
			image: asset.collection.image_url
		}
	}));

	return assets;
};

export const getNftsByCollection = (assets: any) => assets.reduce((acc: any, curr: any) => {
	acc[curr.collection.slug] = [...acc[curr.collection.slug] || [], curr];
	return acc;
}, {});

export const getEstimatedValue = (assets: any) => {
	const totalEstimatedValue = assets.reduce((acc: any, curr: any) => {
		if (curr.last_sale) {
			return acc + Number(curr.last_sale.payment_token.usd_price);
		}
		return acc;
	}, 0);

	return totalEstimatedValue.toString();
};
