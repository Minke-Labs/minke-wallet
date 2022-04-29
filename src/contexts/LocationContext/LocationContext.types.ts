export interface Currency {
	flag: string;
	iso: string;
	currencyName: string;
	currency: string;
	payment_id: string | null;
}

export interface LocationContextProps {
	countryCode: string | null;
	setCountryCode: (val: string) => any;
	currencies: Currency[];
	locationCurrency: string;
	paymentOnLocation: string | null;
}
