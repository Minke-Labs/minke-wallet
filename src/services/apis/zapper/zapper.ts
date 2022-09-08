import { ZAPPER_API_KEY } from '@env';
import * as qs from 'qs';
import axios from 'axios';

export const fetchNFTNetWorth = async (address: string): Promise<string> => {
	const params = {
		api_key: ZAPPER_API_KEY || process.env.ZAPPER_API_KEY,
		'addresses[]': address.toLowerCase()
	};
	const { data } = await axios.get(`https://api.zapper.fi/v2/nft/balances/net-worth?${qs.stringify(params)}`);
	return data[address.toLowerCase()];
};

export const generateUrl = (addresses: string[], networks: string[]) => {
	let url = 'https://api.zapper.fi/v2/balances?';
	addresses.forEach((address, _index) => {
		url += `addresses[]=${address}${_index === addresses.length - 1 ? '' : '&'}`;
	});
	networks.forEach((network, _index) => {
		url += `&networks[]=${network}${_index === networks.length - 1 ? '' : '&'}`;
	});
	return encodeURI(url);
};

export const generateEventSourceDict = () => ({
	withCredentials: true,
	headers: {
		'Content-Type': 'text/event-stream',
		'User-Agent': 'Mozilla/5.0',
		Authorization: `Basic ${Buffer.from(`${ZAPPER_API_KEY || process.env.ZAPPER_API_KEY}:`, 'binary').toString(
			'base64'
		)}`
	}
});
