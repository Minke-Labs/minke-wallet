interface Collection {
	slug: string;
	name: string;
	description: string;
	image_url: string;
}

interface PaymentToken {
	usd_price: string;
	decimals: number;
	name: string;
	symbol: string;
}

interface LastSale {
	payment_token: PaymentToken;
	total_price: string;
	quantity: string;
}

export interface Stats {
	floor_price: number;
	symbol?: string | undefined;
}

export interface NFT {
	id: string;
	name: string;
	image_original_url: string;
	image_url: string;
	image_thumbnail_url: string;
	last_sale: LastSale | null;
	collection: Collection;
	permalink: string;
	stats: Stats;
}
