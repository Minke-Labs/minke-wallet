import { createState } from '@hookstate/core';
import { ParaswapToken } from '@models/token';

export interface ExchangeState {
	from: ParaswapToken;
	to: ParaswapToken;
	fromAmount: string | undefined;
	toAmount: string | undefined;
}

const globalStateInit = createState({} as ExchangeState);
export function globalExchangeState() {
	return globalStateInit;
}
