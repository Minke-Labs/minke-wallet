export interface Country {
	name: string;
	flag: string;
	iso: string;
	currencyName: string;
	currency: string;
	paymentName: string | null;
	minTopup: number | null;
}
