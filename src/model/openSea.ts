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

// Assets object created from the data retrieved from the api.
export const assets = mock.assets.map((item: any) => ({
	name: item.name,
	id: item.id,
	image: item.image_url,
	thumb: item.image_thumbnail_url,
	permalink: item.permalink,
	last_sale: item.last_sale,
	collection: {
		name: item.collection.name,
		desc: item.collection.description,
		slug: item.collection.slug,
		image: item.collection.image_url
	}
}));

const collections = assets.map((item: any) => item.collection);
export const nftsByCollection = collections.reduce((acc: any, item: any) => ({
	...acc,
	[item.slug]: assets.filter((nft: any) => nft.collection.slug === item.slug)
}), []);

export const collectionArr = Object.keys(nftsByCollection);
export const getCollectionBySlug = (slug: string) => nftsByCollection[slug][0].collection;
