export interface Currency {
	code: string;
	country: string;
	name?: string;
	minBuyAmount?: number;
	maxBuyAmount?: number;
}
