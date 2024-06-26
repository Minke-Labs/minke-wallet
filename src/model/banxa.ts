import axios from 'axios';

import * as qs from 'qs';
import crypto from 'crypto';
import { BANXA_ENDPOINT_URL, BANXA_KEY, BANXA_SECRET } from '@env';
import { pick } from 'lodash';
import { Currency } from './types/currency.types';
import { fiatCurrencies } from './currency';

interface GenerateHmac {
	data: string;
	nonce: number;
}

interface QuoteParams {
	source: string;
	target: string;
	source_amount: number | undefined;
	target_amount: number | undefined;
	payment_method_id: number;
	blockchain: string;
}

interface SendRequest {
	query: string;
	params?: QuoteParams | OrderParams;
}
interface SendPostRequest {
	query: string;
	params?: OrderParams;
}

interface GetPrices {
	params: QuoteParams;
}

interface OrderParams {
	account_reference: string;
	source: string;
	source_amount: string | undefined;
	target_amount: string | undefined;
	target: string;
	wallet_address: string;
	return_url_on_success: string;
	payment_method_id: string;
}

interface MakeOrder {
	params: OrderParams;
}

const generateHmac = ({ data, nonce }: GenerateHmac) => {
	const key = BANXA_KEY || process.env.BANXA_KEY;
	const secret = BANXA_SECRET || process.env.BANXA_SECRET;

	const localSignature = crypto.createHmac('SHA256', secret!).update(data).digest('hex');
	return `${key}:${localSignature}:${nonce}`;
};

const sendGetRequest = async ({ query, params }: SendRequest) => {
	const nonce = Date.now();
	const quoteParams = qs.stringify(params) ?? '';
	const hostname = BANXA_ENDPOINT_URL || process.env.BANXA_ENDPOINT_URL;

	const data = `GET\n${query}?${quoteParams}\n${nonce}`;

	const hmac = generateHmac({ data, nonce });
	const options = {
		hostname,
		path: query,
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			Authorization: `Bearer ${hmac}`
		}
	};

	const res = await axios.get(`https://${hostname}${query}?${quoteParams}`, options);
	return res.data;
};

export const sendPostRequest = async ({ query, params }: SendPostRequest) => {
	const nonce = Date.now();
	const hostname = BANXA_ENDPOINT_URL || process.env.BANXA_ENDPOINT_URL;

	const data = `POST\n${query}\n${nonce}\n${JSON.stringify(params)}`;

	const hmac = generateHmac({ data, nonce });

	const options = {
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			Authorization: `Bearer ${hmac}`
		},
		validateStatus() {
			return true;
		}
	};

	const res = await axios.post(`https://${hostname}${query}`, { ...params }, options);
	return res;
};

export const getPaymentMethods = async () => {
	const query = '/api/payment-methods';
	const res = await sendGetRequest({ query });
	return res.data.payment_methods.map((item: any) => ({
		id: item.id,
		name: item.name,
		minTopup: item.transaction_limits[0].min
	}));
};

export const pickPaymentMethodFromName = async (name: string) => {
	const paymentMethods = await getPaymentMethods();
	return paymentMethods.find((item: any) => item.name === name);
};

export const getPrices = async ({ params }: GetPrices) => {
	const query = '/api/prices';
	const res = await sendGetRequest({ query, params });
	return res;
};

export const getOrder = async (id: string) => {
	const query = `/api/orders/${id}`;
	const res = await sendGetRequest({ query });
	return res;
};

export const makeOrder = async ({ params }: MakeOrder) => {
	const query = '/api/orders';
	const res = await sendPostRequest({ query, params });
	return res.data.data.order.checkout_url;
};

export const availableFiatCurrencies: { [key: string]: Currency } = pick(fiatCurrencies, 'CAD', 'TRY', 'AUD');
