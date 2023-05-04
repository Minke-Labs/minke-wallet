export interface UseZerionBalancesParams {
	address: string;
}

export interface Implementation {
	chain_id: string;
	address: string;
	decimals: number;
}

export interface ZerionAsset {
	attributes: {
		quantity: {
			decimals: number;
			numeric: string;
		};
		fungible_info: {
			name: string;
			symbol: string;
			implementations: Implementation[];
		};
		value: number;
		price: number;
	};
	relationships: {
		chain: {
			data: {
				id: string;
			};
		};
	};
}

export interface ZerionTokenData {
	data: ZerionAsset[];
}
