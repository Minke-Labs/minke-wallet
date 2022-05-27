import { Country } from './LanguageContext.types';

const mockCurrency: Country = {
	name: 'United States',
	flag: 'unitedStates',
	iso: 'US',
	currencyName: 'United States Dollar',
	currency: 'USD',
	paymentName: null
};

export const mock = {
	countryCode: 'US',
	errorMsg: undefined,
	setCountryCode: () => { },
	locationCurrency: mockCurrency.currency,
	countries: [
		mockCurrency
	],
	locationCountry: mockCurrency
};
