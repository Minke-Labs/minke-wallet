import { useNavigation, useWyreOrderStatus } from '@hooks';
import { WYRE_ORDER_STATUS_TYPES } from '@models/wyre.types';
import { useState } from '@hookstate/core';
import { globalTopUpState, TopUpState } from '@stores/TopUpStore';

export const useTopUpWaitScreen = () => {
	const navigation = useNavigation();
	const topUpState = useState(globalTopUpState());

	const { status, transactionHash, orderId } = useWyreOrderStatus();

	const isFailed = status === WYRE_ORDER_STATUS_TYPES.failed;
	const checking = status === WYRE_ORDER_STATUS_TYPES.checking;
	const processing = status === WYRE_ORDER_STATUS_TYPES.pending;
	const success = status === WYRE_ORDER_STATUS_TYPES.success;

	const onFinish = () => {
		topUpState.set({} as TopUpState);
		navigation.navigate('WalletScreen');
	};

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
