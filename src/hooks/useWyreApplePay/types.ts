import { Network } from '@models/network';

export interface OnPurchaseParams {
	sourceCurrency: string;
	destCurrency: string;
	value: number;
	country: string;
	network: Network;
	fiat?: boolean;
}

export interface UseWyreApplePayError {
	title?: string;
	description: string;
}

export interface UseWyreApplePay {
	isPaymentComplete: boolean;
	onPurchase: (params: OnPurchaseParams) => Promise<void>;
	orderCurrency?: string | null;
	orderId?: string | null;
	error?: null | UseWyreApplePayError;
}
