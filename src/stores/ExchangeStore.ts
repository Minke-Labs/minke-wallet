import { createState } from '@hookstate/core';
import { MinkeToken } from '@models/types/token.types';
import { BigNumber } from 'ethers';

export interface Gas {
	type: 'normal' | 'fast' | 'slow';
	maxFeePerGas: BigNumber;
	maxPriorityFeePerGas: BigNumber;
	usdPrice: number;
	wait: number;
}

export interface Conversion {
	direction: 'from' | 'to';
	amount: string;
}

export interface ExchangeState {
	from: MinkeToken;
	to: MinkeToken;
	fromAmount: string | undefined;
	toAmount: string | undefined;
	gas: Gas | undefined;
	lastConversion?: Conversion;
}

const globalStateInit = createState({} as ExchangeState);
export function globalExchangeState() {
	return globalStateInit;
}
