/* eslint-disable @typescript-eslint/no-unused-vars */
import * as qs from 'qs';
import crypto from 'crypto';
import { BANXA_ENDPOINT_URL, BANXA_KEY, BANXA_SECRET } from '@env';

interface GenerateHmac {
	data: string;
	nonce: number;
}

interface QuoteParams {
	source: string;
	target: string;
	amount: number;
}

interface SendGetRequest {
	query: string;
	method: string;
	params?: QuoteParams;
}

interface GetPrices {
	params: QuoteParams;
}

const generateHmac = ({ data, nonce }: GenerateHmac) => {
	const key = BANXA_KEY || process.env.BANXA_KEY;
	const secret = BANXA_SECRET || process.env.BANXA_SECRET;

	const localSignature = crypto.createHmac('SHA256', secret!).update(data).digest('hex');
	return `${key}:${localSignature}:${nonce}`;
};

const sendGetRequest = async ({ query, method, params }: SendGetRequest) => {
	const hostname = BANXA_ENDPOINT_URL || process.env.BANXA_ENDPOINT_URL;

	const nonce = Date.now();
	const quoteParams = qs.stringify(params);

	const data = `${method}\n${query}?${quoteParams}\n${nonce}`;

	const hmac = generateHmac({ data, nonce });
	const options = {
		hostname,
		path: query,
		method,
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			Authorization: `Bearer ${hmac}`
		}
	};

	const res = await fetch(`https://${hostname}${query}?${quoteParams}`, options);
	const resData = await res.json();
	return resData.data;
};

export const getPaymentMethods = async () => {
	const query = '/api/payment-methods';
	const method = 'GET';
	const res = await sendGetRequest({ query, method });
	return res;
};

export const getPrices = async ({ params }: GetPrices) => {
	const query = '/api/prices';
	const method = 'GET';

	const res = await sendGetRequest({ query, method, params });
	return res;
};
