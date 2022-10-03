export interface CovalentToken {
	contract_decimals: number;
	contract_name: string;
	contract_ticker_symbol: string;
	contract_address: string;
	logo_url: string;
	last_transferred_at: string;
	type: string;
	balance: string;
	balance_24h: string;
	quote_rate: number;
	quote_rate_24h: number;
	quote: number;
	quote_24h: number;
	nft_data: null;
}

export interface TokenConverterParams {
	source: 'covalent';
	token: CovalentToken;
	chainId: number;
}

export interface TokensConverterParams {
	source: 'covalent';
	tokens: CovalentToken[];
	chainId: number;
}
