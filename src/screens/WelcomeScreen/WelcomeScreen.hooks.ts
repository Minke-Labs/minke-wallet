import React, { useCallback, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { walletCreate } from '@models/wallet';
import { useAmplitude, useNavigation } from '@hooks';
import Intercom from '@intercom/intercom-react-native';
import { globalWalletState, walletState } from '@stores/WalletStore';

export const useWelcomeScreen = () => {
	const navigation = useNavigation();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const state = useState(globalWalletState());
	const { track } = useAmplitude();

	const onImportFinished = () => {
		setModalVisible(false);
		navigation.navigate('WalletCreatedScreen');
	};

	const onCreateWallet = useCallback(async () => {
		setLoading(true);
		const newWallet = await walletCreate();
		track('Created Wallet', { newAddress: newWallet.address });
		state.set(await walletState(newWallet));

		// Register user on Intercom
		Intercom.registerIdentifiedUser({ userId: newWallet.address });

		setLoading(false);
		navigation.navigate('WalletCreatedScreen');
	}, [navigation]);

	useEffect(() => {
		track('Opened Welcome Screen');
	}, []);

	return {
		isModalVisible,
		setModalVisible,
		onImportFinished,
		onCreateWallet,
		loading
	};
};
