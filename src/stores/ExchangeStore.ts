import { createState } from '@hookstate/core';
import { ParaswapToken } from '@models/token';

export interface Gas {
	type: string;
	gweiValue: number;
	usdPrice: number;
	wait: number;
}

export interface Conversion {
	direction: 'from' | 'to';
	amount: string;
}

export interface ExchangeState {
	from: ParaswapToken;
	to: ParaswapToken;
	fromAmount: string | undefined;
	toAmount: string | undefined;
	gas: Gas | undefined;
	lastConversion?: Conversion;
}

const globalStateInit = createState({} as ExchangeState);
export function globalExchangeState() {
	return globalStateInit;
}
