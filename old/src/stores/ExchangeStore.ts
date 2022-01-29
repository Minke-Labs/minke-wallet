import { createState } from '@hookstate/core';
import { ParaswapToken } from 'old/src/model/token';

export interface Gas {
	type: string;
	gweiValue: number;
	gweiPrice: number;
	wait: number;
}

export interface ExchangeState {
	from: ParaswapToken;
	to: ParaswapToken;
	fromAmount: string | undefined;
	toAmount: string | undefined;
	gas: Gas | undefined;
}

const globalStateInit = createState({} as ExchangeState);
export function globalExchangeState() {
	return globalStateInit;
}
