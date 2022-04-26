export interface Currency {
	flag: string;
	iso: string;
	currencyName: string;
	currency: string;
}

export interface LocationContextProps {
	countryCode: string | null;
	setCountryCode: (val: string) => any;
	currencies: Currency[];
	locationCurrency: string;
}
