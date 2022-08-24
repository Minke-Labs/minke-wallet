export interface MoonpayCurrency {
	id: string;
	type: 'crypto' | 'fiat';
	name: string;
	code: string;
	minBuyAmount: number;
	maxBuyAmount: number;
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

export interface MoonpayQuote {
	currencyCode: string;
	quoteCurrencyCode: string;
	baseCurrencyCode: string;
	baseCurrencyAmount: string | undefined;
	quoteCurrencyAmount: string | undefined;
	areFeesIncluded: boolean;
}
