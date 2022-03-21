import React, { useCallback } from 'react';
import { useState } from '@hookstate/core';
import { walletCreate } from '@models/wallet';
import { useNavigation } from '@hooks';
import { globalWalletState, walletState } from '@stores/WalletStore';

export const useWelcomeScreen = () => {
	const navigation = useNavigation();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const state = useState(globalWalletState());

	const onImportFinished = () => {
		setModalVisible(false);
		navigation.navigate('WalletCreatedScreen');
	};

	const onCreateWallet = useCallback(async () => {
		setLoading(true);
		const newWallet = await walletCreate();
		state.set(await walletState(newWallet));
		setLoading(false);
		navigation.navigate('WalletCreatedScreen');
	}, [navigation]);

	return {
		isModalVisible,
		setModalVisible,
		onImportFinished,
		onCreateWallet,
		loading
	};
};
