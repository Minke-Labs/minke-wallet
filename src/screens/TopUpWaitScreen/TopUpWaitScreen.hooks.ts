import { useEffect } from 'react';
import { useGlobalWalletState, useNavigation, useTransactions, useWyreOrderStatus } from '@hooks';
import { WYRE_ORDER_STATUS_TYPES } from '@models/types/wyre.types';
import { useState } from '@hookstate/core';
import { globalTopUpState, TopUpState } from '@stores/TopUpStore';
import SafariView from 'react-native-safari-view';

export const useTopUpWaitScreen = () => {
	const navigation = useNavigation();
	const topUpState = useState(globalTopUpState());
	const {
		address,
		network: { chainId }
	} = useGlobalWalletState();
	const { addPendingTransaction } = useTransactions();

	const { status, transactionHash, orderId } = useWyreOrderStatus();

	const isFailed = status === WYRE_ORDER_STATUS_TYPES.failed;
	const checking = status === WYRE_ORDER_STATUS_TYPES.checking;
	const processing = status === WYRE_ORDER_STATUS_TYPES.pending;
	const success = status === WYRE_ORDER_STATUS_TYPES.success;

	const onFinish = () => {
		topUpState.merge({} as TopUpState);
		navigation.navigate('HomeScreen');
	};

	const { sourceAmount, authenticationUrl } = topUpState.value;

	useEffect(() => {
		if (authenticationUrl) {
			SafariView.show({
				url: authenticationUrl
			});
		}
	}, [authenticationUrl]);

	useEffect(() => {
		if (processing) {
			SafariView.dismiss();
		}
	}, [processing]);

	useEffect(() => {
		const addTransaction = async (hash: string) => {
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
				symbol: 'USD',
				chainId
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
