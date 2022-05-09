/* eslint-disable no-tabs */
import { Currency } from './LocationContext.types';

const mockCurrency: Currency = {
	flag: 'unitedStates',
	iso: 'US',
	currencyName: 'United States Dollar',
	currency: 'USD',
	payment_id: null
};

export const mock = {
	countryCode: 'US',
	errorMsg: undefined,
	setCountryCode: () => { },
	locationCurrency: mockCurrency.currency,
	paymentOnLocation: mockCurrency.payment_id,
	currencies: [
		mockCurrency
	]
};

export const currencies: Currency[] = [
	{
		flag: 'unitedStates',
		iso: 'US',
		currencyName: 'United States Dollar',
		currency: 'USD',
		payment_id: null
	},
	{
		flag: 'europeanUnion',
		iso: 'EU',
		currencyName: 'Euro',
		currency: 'EUR',
		payment_id: '6041'
	},
	{
		flag: 'unitedKingdom',
		iso: 'UK',
		currencyName: 'British Pound',
		currency: 'GBP',
		payment_id: '6043'
	},
	{
		flag: 'australia',
		iso: 'AU',
		currencyName: 'Australian Dollar',
		currency: 'AUD',
		payment_id: '7538'
	},
	// {
	// 	flag: 'china',
	// 	iso: 'CN',
	// 	currencyName: 'Chinese Yuan',
	// 	currency: 'CNY',
	// 	payment_id: null
	// },
	// {
	// 	flag: 'southKorea',
	// 	iso: 'KR',
	// 	currencyName: 'South Korean Won',
	// 	currency: 'KRW',
	// 	payment_id: null
	// },
	// {
	// 	flag: 'russia',
	// 	iso: 'RU',
	// 	currencyName: 'Russian Ruble',
	// 	currency: 'RUB',
	// 	payment_id: null
	// },
	// {
	// 	flag: 'india',
	// 	iso: 'IN',
	// 	currencyName: 'Indian Rupee',
	// 	currency: 'INR',
	// 	payment_id: null
	// },
	// {
	// 	flag: 'japan',
	// 	iso: 'JP',
	// 	currencyName: 'Japanese Yen',
	// 	currency: 'JPY',
	// 	payment_id: null
	// },
	// {
	// 	flag: 'turkey',
	// 	iso: 'TR',
	// 	currencyName: 'Turkish Lira',
	// 	currency: 'TRY',
	// 	payment_id: null
	// },
	{
		flag: 'canada',
		iso: 'CA',
		currencyName: 'Canadian Dollar',
		currency: 'CAD',
		payment_id: '6031'
	},
	// {
	// 	flag: 'newZealand',
	// 	iso: 'NZ',
	// 	currencyName: 'New Zealand Dollar',
	// 	currency: 'NZD',
	// 	payment_id: null
	// },
	// {
	// 	flag: 'southafrica',
	// 	iso: 'ZA',
	// 	currencyName: 'South African Rand',
	// 	currency: 'ZAR',
	// 	payment_id: null
	// },
	{
		flag: 'brazil',
		iso: 'BR',
		currencyName: 'Brazilian Real',
		currency: 'BRL',
		payment_id: '7540'
	}
];

export const currencyByIso = (iso: string) => currencies.find((currency) => currency.iso === iso) || null;
