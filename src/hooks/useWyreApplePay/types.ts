export interface OnPurchaseParams {
	currency: string;
	value: number;
}

export interface UseWyreApplePayError {
	title?: string;
	description: string;
}

export interface UseWyreApplePay {
	isPaymentComplete: boolean;
	onPurchase: ({ currency, value }: OnPurchaseParams) => Promise<void>;
	orderCurrency?: string | null;
	orderId?: string | null;
	error?: null | UseWyreApplePayError;
}
