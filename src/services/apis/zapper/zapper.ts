import { ZAPPER_API_KEY } from '@env';
import * as qs from 'qs';
import axios from 'axios';

export const fetchNFTNetWorth = async (address: string): Promise<string> => {
	const params = {
		api_key: ZAPPER_API_KEY || process.env.ZAPPER_API_KEY,
		'addresses[]': address.toLocaleLowerCase()
	};
	const { data } = await axios.get(`https://api.zapper.fi/v2/nft/balances/net-worth?${qs.stringify(params)}`);
	return data[address.toLocaleLowerCase()];
};
