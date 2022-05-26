import React, { useCallback, useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import { network as selectedNetwork } from '@models/network';
import { globalTopUpState } from '@stores/TopUpStore';
import { useState } from '@hookstate/core';
import { WYRE_ORDER_STATUS_TYPES } from '@models/types/wyre.types';
import { trackWyreOrder, trackWyreTransfer } from '@models/wyre';
import Logger from '@utils/logger';

const MAX_TRIES = 10 * 60;
const MAX_ERROR_TRIES = 3;
let orderStatusHandle: null | ReturnType<typeof setTimeout> = null;
let transferHashHandle: null | ReturnType<typeof setTimeout> = null;

const useWyreOrderStatus = () => {
	const { referenceInfo, orderId } = useState(globalTopUpState()).value;
	const [status, setStatus] = React.useState<string | null>(null);
	const [transfer, setTransfer] = React.useState<string | null>(null);
	const [transactionHash, setTransactionHash] = React.useState<string | null>(null);

	const getOrderStatus = useCallback(
		async (remainingTries = MAX_TRIES, remainingErrorTries = MAX_ERROR_TRIES) => {
			try {
				if (remainingTries === 0) return;
				const network = await selectedNetwork();
				const { data, orderStatus, transferId } = await trackWyreOrder(referenceInfo, orderId, network);
				setStatus(orderStatus);

				const isFailed = orderStatus === WYRE_ORDER_STATUS_TYPES.failed;

				if (isFailed) {
					Logger.error(`get order status error: ${data}`);
				}

				if (transferId && !transfer) {
					setTransfer(transferId);
				} else if (!isFailed) {
					orderStatusHandle = setTimeout(() => getOrderStatus(remainingTries - 1, remainingErrorTries), 1000);
				}
			} catch (error) {
				captureException(error);
				if (remainingErrorTries === 0) return;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
				if (transferHash) {
					setTransactionHash(transferHash);
					getOrderStatus();
				} else {
					transferHashHandle = setTimeout(
						() => getTransferHash(remainingTries - 1, remainingErrorTries),
						1000
					);
				}
			} catch (error) {
				captureException(error);
				if (remainingErrorTries === 0) return;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	return { status, transfer, transactionHash, orderId };
};

export default useWyreOrderStatus;
