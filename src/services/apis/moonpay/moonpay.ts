import axios from 'axios';
import { MOONPAY_API_URL, MOONPAY_API_KEY } from '@env';
import Logger from '@utils/logger';
import { MoonpayCountry, MoonpayCurrency, MoonpayQuote } from './moonpay.types';

const instance = axios.create({
	baseURL: MOONPAY_API_URL || process.env.MOONPAY_API_URL,
	timeout: 5000,
	params: {
		apiKey: MOONPAY_API_KEY || process.env.MOONPAY_API_KEY
	}
});

const getCurrencies = async (): Promise<MoonpayCurrency[]> => {
	const { status, data } = await instance.get('/currencies');
	if (status !== 200) Logger.sentry('Moonpay getCurrencies API failed');
	return data;
};

const getCountries = async (): Promise<MoonpayCountry[]> => {
	const { status, data } = await instance.get('/countries');
	if (status !== 200) Logger.sentry('Moonpay getCountries API failed');
	return data;
};

const buyQuote = async ({ currencyCode, ...params }: MoonpayQuote) => {
	const { status, data } = await instance.get(`/currencies/${currencyCode}/buy_quote/`, { params });
	if (status !== 200) Logger.sentry('Moonpay buyQuote API failed');
	return data;
};

export { getCurrencies, getCountries, buyQuote };
