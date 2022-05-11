export interface Country {
	name: string;
	flag: string;
	iso: string;
	currencyName: string;
	currency: string;
	payment_id: string | null;
}

export interface LocationContextProps {
	countryCode: string | null;
	setCountryCode: (val: string) => any;
	countries: Country[];
	locationCurrency: string;
	paymentOnLocation: string | null;
	locationCountry: Country | null;
}
