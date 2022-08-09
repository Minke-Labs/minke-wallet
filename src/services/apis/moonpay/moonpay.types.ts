export interface MoonpayCurrency {
	id: string;
	type: 'crypto' | 'fiat';
	name: string;
	code: string;
}

export interface MoonpayCountry {
	alpha2: string;
	alpha3: string;
	isAllowed: boolean;
	isBuyAllowed: boolean;
	isSellAllowed: boolean;
	name: string;
	supportedDocuments: string[];
}
