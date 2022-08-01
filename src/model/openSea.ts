/* eslint-disable max-len */
/* eslint-disable no-console */
import axios from 'axios';
import { mock } from './mockRes';

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

// Assets object created from the data retrieved from the api.
const assets = mock.assets.map((asset: any) => ({
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

export const nftsByCollection = assets.reduce((acc: any, curr: any) => {
	acc[curr.collection.slug] = [...acc[curr.collection.slug] || [], curr];
	return acc;
}, {});
