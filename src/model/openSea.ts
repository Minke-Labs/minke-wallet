import axios from 'axios';

interface SendRequest {
	collectionName: string;
}

export const sendGetRequest = async ({ collectionName }: SendRequest) => {
	const res = await axios.request({
		method: 'GET',
		url: `https://api.opensea.io/api/v1/collection/${collectionName}`
	});
	return res.data;
};

export const getCollectionInfo = async ({ name }: { name: string }) => {
	const res = await sendGetRequest({ collectionName: name });
	const resObj = ({
		image: res.collection.featured_image_url,
		name: res.collection.name,
		desc: res.collection.description
	});
	return resObj;
};
