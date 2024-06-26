import { createState } from '@hookstate/core';
import { MinkeToken } from '@models/types/token.types';

export interface RedeemState {
	from: MinkeToken;
	to: MinkeToken;
	value: number;
}

const globalStateInit = createState({} as RedeemState);
export function globalRedeemState() {
	return globalStateInit;
}
