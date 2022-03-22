import { createState } from '@hookstate/core';

export interface WyreReferenceInfo {
	referenceId: string;
	orderId?: string;
	transferId?: string;
}

export interface TopUpState {
	referenceInfo: WyreReferenceInfo;
	currency: string;
	orderId: string;
	paymentResponse: any;
	sourceAmount: string;
}

const globalStateInit = createState({} as TopUpState);
export function globalTopUpState() {
	return globalStateInit;
}
