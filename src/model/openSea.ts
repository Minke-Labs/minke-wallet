import axios from 'axios';

interface SendRequest {
	collectionSlug: string;
}

export const sendGetRequest = async ({ collectionSlug }: SendRequest) => {
	const res = await axios.request({
		method: 'GET',
		url: `https://api.opensea.io/api/v1/collection/${collectionSlug}`
	});
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
