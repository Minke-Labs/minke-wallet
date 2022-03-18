import { UseWyreApplePayError } from '@src/hooks/useWyreApplePay/types';

export const WYRE_ORDER_STATUS_TYPES = {
	checking: 'RUNNING_CHECKS',
	failed: 'FAILED',
	pending: 'PROCESSING',
	success: 'COMPLETE'
} as const;

export type WyreOrderStatusType = typeof WYRE_ORDER_STATUS_TYPES[keyof typeof WYRE_ORDER_STATUS_TYPES];

export interface ApplePayResponse {
	paymentResponse?: any;
	error?: UseWyreApplePayError;
}
