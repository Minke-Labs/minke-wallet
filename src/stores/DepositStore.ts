import { createState } from '@hookstate/core';
import { AaveMarket } from '@models/deposit';

export interface DepositState {
	market: AaveMarket;
	amount: number;
}

const globalStateInit = createState({ amount: 0 } as DepositState);

export const globalDepositState = () => globalStateInit;
