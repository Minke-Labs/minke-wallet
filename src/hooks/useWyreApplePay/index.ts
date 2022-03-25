import React, { useCallback } from 'react';
import { globalWalletState } from '@stores/WalletStore';
import { useState } from '@hookstate/core';
import { getOrderId, getWalletOrderQuotation, reserveWyreOrder, showApplePayRequest } from '@models/wyre';
import { globalTopUpState, WyreReferenceInfo } from '@stores/TopUpStore';
import useTimeout from '../useTimeout';
import { OnPurchaseParams, UseWyreApplePay, UseWyreApplePayError } from './types';
import useAmplitude from '../useAmplitude';

export default function useWyreApplePay(): UseWyreApplePay {
	const { address: accountAddress, network } = useState(globalWalletState()).value;
	const topUpState = useState(globalTopUpState());
	const [isPaymentComplete, setPaymentComplete] = React.useState(false);
	const [orderCurrency, setOrderCurrency] = React.useState<string | null>(null);
	const [orderId, setOrderId] = React.useState(null);
	const [error, setError] = React.useState<UseWyreApplePayError>();
	const { track } = useAmplitude();

	const [startPaymentCompleteTimeout] = useTimeout();

	const handlePaymentCallback = useCallback(() => {
		// In order to have the UI appear to be in-sync with the Apple Pay modal's
		// animation, we need to artificially delay before marking a purchase as pending.
		// @ts-ignore
		startPaymentCompleteTimeout(() => setPaymentComplete(true), 1500);
	}, [startPaymentCompleteTimeout]);

	const onPurchase = useCallback(
		async ({ currency, value }: OnPurchaseParams) => {
			const referenceInfo: WyreReferenceInfo = {
				referenceId: accountAddress.toLowerCase().substr(-12)
			};

			const { reservation: reservationId } = await reserveWyreOrder(value, currency, accountAddress, network);

			if (!reservationId) {
				setError({ description: 'We were unable to reserve your purchase order. Please try again later.' });
				return;
			}

			track('Created Wyre Reservation', { id: reservationId });
			const quotation = await getWalletOrderQuotation(value, currency, accountAddress, network);

			if (!quotation) {
				setError({
					description: 'We were unable to get a quote on your purchase order. Please try again later.'
				});
				return;
			}
			track('Created Wyre Quotation', quotation);
			const { sourceAmountWithFees, purchaseFee } = quotation;

			const { paymentResponse: applePayResponse, error: appleRequestError } = await showApplePayRequest(
				referenceInfo,
				currency,
				sourceAmountWithFees,
				purchaseFee,
				value,
				network
			);

			setOrderCurrency(currency);

			if (applePayResponse) {
				track('Confirmed Apple Pay Payment');
				const { orderId: id, errorMessage } = await getOrderId(
					referenceInfo,
					applePayResponse,
					sourceAmountWithFees,
					accountAddress,
					currency,
					network,
					reservationId
				);
				if (id) {
					track('Apple Pay Payment - Done', { id, currency, value });
					topUpState.merge({
						currency,
						orderId: id,
						paymentResponse: applePayResponse,
						referenceInfo,
						sourceAmount: value.toString()
					});
					applePayResponse.complete('success');
					setOrderId(id);
					handlePaymentCallback();
				} else {
					track('Apple Pay Payment - Error', { errorMessage });
					setError({
						description: errorMessage
					});
					applePayResponse.complete('fail');
					handlePaymentCallback();
				}
			} else if (appleRequestError) {
				setError(appleRequestError);
			}
		},
		[accountAddress, network]
	);

	return {
		isPaymentComplete,
		onPurchase,
		orderCurrency,
		orderId,
		error
	};
}
