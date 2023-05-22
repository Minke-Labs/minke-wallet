import axios from 'axios';

import { OPENPEER_API_KEY, OPENPEER_API_URL } from '@env';
import Logger from '@utils/logger';

import { Currency, OpenPeerQuote } from './openpeer.types';

const instance = axios.create({
	baseURL: OPENPEER_API_URL || process.env.OPENPEER_API_URL,
	timeout: 5000,
	headers: {
		'X-Access-Token': (OPENPEER_API_KEY || process.env.OPENPEER_API_KEY)!
	},
	validateStatus() {
		return true;
	}
});

export const getCurrencies = async (): Promise<Currency[]> => {
	const { status, data } = await instance.get('/currencies');
	if (status !== 200) Logger.sentry('OpenPeer GET currencies API failed');
	return data;
};

export const buyQuote = async (params: OpenPeerQuote) => {
	const { status, data } = await instance.get('/quotes', { params });
	if (status !== 200) Logger.sentry('OpenPeer GET quick buy API failed');
	return data;
};
