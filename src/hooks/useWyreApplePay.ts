import { globalWalletState } from '@src/stores/WalletStore';
import { useState } from '@hookstate/core';
import React, { useCallback } from 'react';
import { getOrderId, getWalletOrderQuotation, reserveWyreOrder, showApplePayRequest } from '@src/model/wyre';
import useTimeout from './useTimeout';

export default function useWyreApplePay() {
	const { address: accountAddress, network } = useState(globalWalletState()).value;
	const [isPaymentComplete, setPaymentComplete] = React.useState(false);
	const [orderCurrency, setOrderCurrency] = React.useState(null);
	const [orderId, setOrderId] = React.useState(null);

	const [startPaymentCompleteTimeout] = useTimeout();

	const handlePaymentCallback = useCallback(() => {
		// In order to have the UI appear to be in-sync with the Apple Pay modal's
		// animation, we need to artificially delay before marking a purchase as pending.
		startPaymentCompleteTimeout(() => setPaymentComplete(true), 1500);
	}, [startPaymentCompleteTimeout]);

	const onPurchase = useCallback(
		async ({ currency, value }) => {
			const { reservation: reservationId } = await reserveWyreOrder(value, currency, accountAddress, network);

			if (!reservationId) {
				console.error('We were unable to reserve your purchase order. Please try again later.');
				return;
			}
			const quotation = await getWalletOrderQuotation(value, currency, accountAddress, network);

			if (!quotation) {
				console.error('We were unable to get a quote on your purchase order. Please try again later.');
				return;
			}

			const { sourceAmountWithFees, purchaseFee } = quotation;

			const applePayResponse = await showApplePayRequest(
				currency,
				sourceAmountWithFees,
				purchaseFee,
				value,
				network
			);

			setOrderCurrency(currency);

			if (applePayResponse) {
				const { orderId: id } = await getOrderId(
					accountAddress.toLowerCase().substr(-12),
					applePayResponse,
					sourceAmountWithFees,
					accountAddress,
					currency,
					network,
					reservationId
				);
				if (id) {
					applePayResponse.complete('success');
					setOrderId(id);
					handlePaymentCallback();
				} else {
					applePayResponse.complete('failures');
				}
			} else {
				console.error('Purchase incomplete');
			}
		},
		[accountAddress, network]
	);

	return {
		isPaymentComplete,
		onPurchase,
		orderCurrency,
		orderId
	};
}
