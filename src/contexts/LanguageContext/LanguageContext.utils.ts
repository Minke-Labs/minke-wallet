import { Country } from './LanguageContext.types';

const mockCurrency: Country = {
	name: 'United States',
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
	countries: [
		mockCurrency
	],
	locationCountry: mockCurrency
};
