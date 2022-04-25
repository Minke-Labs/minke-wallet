import { Currency } from './LocationContext.types';

const mockCurrency: Currency = {
	flag: 'unitedStates',
	iso: 'US',
	currencyName: 'United States Dollar',
	currency: 'USD'
};

export const mock = {
	countryCode: 'US',
	errorMsg: undefined,
	setCountryCode: () => { },
	locationCurrency: mockCurrency.currency,
	currencies: [
		mockCurrency
	]
};

export const currencies: Currency[] = [
	{
		flag: 'unitedStates',
		iso: 'US',
		currencyName: 'United States Dollar',
		currency: 'USD'
	},
	{
		flag: 'europeanUnion',
		iso: 'EU',
		currencyName: 'Euro',
		currency: 'EUR'
	},
	{
		flag: 'unitedKingdom',
		iso: 'UK',
		currencyName: 'British Pound',
		currency: 'GBP'
	},
	{
		flag: 'australia',
		iso: 'AU',
		currencyName: 'Australian Dollar',
		currency: 'AUD'
	},
	{
		flag: 'china',
		iso: 'CN',
		currencyName: 'Chinese Yuan',
		currency: 'CNY'
	},
	{
		flag: 'southKorea',
		iso: 'KR',
		currencyName: 'South Korean Won',
		currency: 'KRW'
	},
	{
		flag: 'russia',
		iso: 'RU',
		currencyName: 'Russian Ruble',
		currency: 'RUB'
	},
	{
		flag: 'india',
		iso: 'IN',
		currencyName: 'Indian Rupee',
		currency: 'INR'
	},
	{
		flag: 'japan',
		iso: 'JP',
		currencyName: 'Japanese Yen',
		currency: 'JPY'
	},
	{
		flag: 'turkey',
		iso: 'TR',
		currencyName: 'Turkish Lira',
		currency: 'TRY'
	},
	{
		flag: 'canada',
		iso: 'CA',
		currencyName: 'Canadian Dollar',
		currency: 'CAD'
	},
	{
		flag: 'newZealand',
		iso: 'NZ',
		currencyName: 'New Zealand Dollar',
		currency: 'NZD'
	},
	{
		flag: 'southafrica',
		iso: 'ZA',
		currencyName: 'South African Rand',
		currency: 'ZAR'
	}
];

export const currencyByIso = (iso: string) => currencies.find((currency) => currency.iso === iso) || null;
