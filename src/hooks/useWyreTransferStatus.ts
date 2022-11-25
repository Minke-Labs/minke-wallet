import { useState, useCallback, useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import { selectedNetwork } from '@models/network';
import { trackWyreTransfer } from '@models/wyre';

const MAX_TRIES = 10 * 60;
const MAX_ERROR_TRIES = 3;
let transferHashHandle: null | ReturnType<typeof setTimeout> = null;

const useWyreTransferStatus = (transfer: string) => {
	const [transactionHash, setTransactionHash] = useState<string | null>(null);
	const [amount, setAmount] = useState<number | null>(null);
	const [currency, setCurrency] = useState<string | null>(null);

	const getTransferHash = useCallback(
		async (remainingTries = MAX_TRIES, remainingErrorTries = MAX_ERROR_TRIES) => {
			try {
				if (remainingTries === 0) return;
				const network = await selectedNetwork();
				const { transferHash, destAmount, destCurrency } = await trackWyreTransfer(transfer, network);
				if (transferHash) {
					setAmount(destAmount);
					setCurrency(destCurrency);
					setTransactionHash(transferHash);
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
		if (transfer) {
			getTransferHash();
		}
	}, [transfer]);

	return { transactionHash, amount, currency };
};

export default useWyreTransferStatus;
