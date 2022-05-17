export interface Country {
	name: string;
	flag: string;
	iso: string;
	currencyName: string;
	currency: string;
	payment_id: string | null;
	minTopup: number | null;
}
