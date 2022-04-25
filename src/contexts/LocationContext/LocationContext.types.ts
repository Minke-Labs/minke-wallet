export interface Currency {
	flag: string;
	iso: string;
	currencyName: string;
	currency: string;
}

export interface LocationContextProps {
	countryCode: string | null;
	errorMsg: string | undefined;
	setCountryCode: (val: string) => any;
	currencies: Currency[];
	locationCurrency: string;
}
