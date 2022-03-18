import React, { useCallback, useEffect } from 'react';
import { network as selectedNetwork } from '@models/network';
import { globalTopUpState } from '@stores/TopUpStore';
import { useState } from '@hookstate/core';
import { WYRE_ORDER_STATUS_TYPES } from '@models/wyre.types';
import { trackWyreOrder, trackWyreTransfer } from '@models/wyre';

const MAX_TRIES = 10 * 60;
const MAX_ERROR_TRIES = 3;
let orderStatusHandle: null | ReturnType<typeof setTimeout> = null;
let transferHashHandle: null | ReturnType<typeof setTimeout> = null;

const useWyreOrderStatus = () => {
	const { referenceInfo, currency, orderId, paymentResponse, sourceAmount } = useState(globalTopUpState()).value;
	console.log('loading useWyreOrderStatus', orderId);
	const [status, setStatus] = React.useState<string | null>(null);
	const [transfer, setTransfer] = React.useState<string | null>(null);
	const [transactionHash, setTransactionHash] = React.useState<string | null>(null);
	console.log({ status });
	console.log({ transfer });
	console.log({ orderStatusHandle });
	console.log({ transactionHash });

	const getOrderStatus = useCallback(
		async (remainingTries = MAX_TRIES, remainingErrorTries = MAX_ERROR_TRIES) => {
			try {
				if (remainingTries === 0) return;
				const network = await selectedNetwork();
				const { data, orderStatus, transferId } = await trackWyreOrder(referenceInfo, orderId, network);
				setStatus(orderStatus);

				const isFailed = orderStatus === WYRE_ORDER_STATUS_TYPES.failed;

				if (isFailed) {
					const { errorCategory, errorCode, errorMessage } = data;
					console.error('error', data);
					console.log({ errorCategory });
					console.log({ errorCode });
					console.log({ errorMessage });
				}

				if (transferId && !transfer) {
					setTransfer(transferId);
				} else if (!isFailed) {
					orderStatusHandle = setTimeout(() => getOrderStatus(remainingTries - 1, remainingErrorTries), 1000);
				}
			} catch (error) {
				if (remainingErrorTries === 0) return;
				orderStatusHandle = setTimeout(() => getOrderStatus(remainingTries, remainingErrorTries - 1), 5000);
			}
		},
		[orderId, transfer]
	);

	const getTransferHash = useCallback(
		async (remainingTries = MAX_TRIES, remainingErrorTries = MAX_ERROR_TRIES) => {
			try {
				if (remainingTries === 0) return;
				const network = await selectedNetwork();
				const { transferHash } = await trackWyreTransfer(referenceInfo, transfer, network);
				console.log('Fetched the transfer hash', transferHash);
				if (transferHash) {
					setTransactionHash(transferHash);
					getOrderStatus();
				} else {
					console.log('scheduling a new try', remainingTries - 1);
					transferHashHandle = setTimeout(
						() => getTransferHash(remainingTries - 1, remainingErrorTries),
						1000
					);
				}
			} catch (error) {
				if (remainingErrorTries === 0) return;
				transferHashHandle = setTimeout(() => getTransferHash(remainingTries, remainingErrorTries - 1), 5000);
			}
		},
		[transfer]
	);

	useEffect(() => {
		getOrderStatus();
	}, []);

	useEffect(() => {
		if (transfer) {
			getTransferHash();
		}
	}, [transfer]);

	return { status, transfer, transactionHash };
};

export default useWyreOrderStatus;