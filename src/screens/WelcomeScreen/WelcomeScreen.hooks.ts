import React, { useCallback, useEffect } from 'react';
import { useState } from '@hookstate/core';
import { walletCreate } from '@models/wallet';
import { useAmplitude, useNavigation } from '@hooks';
import { globalWalletState, walletState } from '@stores/WalletStore';

export const useWelcomeScreen = () => {
	const navigation = useNavigation();
	const [loading, setLoading] = React.useState(false);
	const state = useState(globalWalletState());
	const { track } = useAmplitude();

	const onImportWallet = () => navigation.navigate('ImportWalletScreen');

	const onCreateWallet = useCallback(async () => {
		setLoading(true);
		const newWallet = await walletCreate();
		track('Created Wallet', { newAddress: newWallet.address });
		state.set(await walletState(newWallet));
		setLoading(false);
		navigation.navigate('WalletCreatedScreen');
	}, [navigation]);

	useEffect(() => {
		track('Opened Welcome Screen');
	}, []);

	return {
		onCreateWallet,
		onImportWallet,
		loading
	};
};
