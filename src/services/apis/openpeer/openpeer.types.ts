export interface Currency {
	id: number;
	code: string;
	name: string;
	country_code: string;
	symbol: string;
}

export interface OpenPeerQuote {
	chain_id: number;
	token_address: string;
	fiat_currency_code: string;
	token_amount?: number;
}
