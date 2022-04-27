import { useEffect } from 'react';
import { useNavigation, useTransactions, useWyreOrderStatus } from '@hooks';
import { WYRE_ORDER_STATUS_TYPES } from '@models/wyre.types';
import { useState } from '@hookstate/core';
import { globalTopUpState, TopUpState } from '@stores/TopUpStore';
import { globalWalletState } from '@stores/WalletStore';

export const useTopUpWaitScreen = () => {
	const navigation = useNavigation();
	const topUpState = useState(globalTopUpState());
	const { address } = useState(globalWalletState()).value;
	const { addPendingTransaction } = useTransactions();

	const { status, transactionHash, orderId } = useWyreOrderStatus();

	const isFailed = status === WYRE_ORDER_STATUS_TYPES.failed;
	const checking = status === WYRE_ORDER_STATUS_TYPES.checking;
	const processing = status === WYRE_ORDER_STATUS_TYPES.pending;
	const success = status === WYRE_ORDER_STATUS_TYPES.success;

	const onFinish = () => {
		topUpState.set({} as TopUpState);
		navigation.navigate('WalletScreen');
	};

	useEffect(() => {
		const addTransaction = async (hash: string) => {
			const { sourceAmount } = topUpState.value;
			addPendingTransaction({
				topUp: true,
				hash,
				txSuccessful: true,
				pending: true,
				timeStamp: (new Date().getTime() / 1000).toString(),
				amount: sourceAmount,
				destination: address,
				from: address,
				direction: 'incoming',
				symbol: 'USD'
			});
			onFinish();
		};

		if (transactionHash && !isFailed) {
			addTransaction(transactionHash);
		}
	}, [transactionHash]);

	return {
		isFailed,
		checking,
		processing,
		success,
		onFinish,
		orderId,
		transactionHash
	};
};
