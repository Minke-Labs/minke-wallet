import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { walletState, globalWalletState } from '@src/stores/WalletStore';
import { useNavigation } from '@hooks';

export const useAccountsScreen = () => {
	const navigation = useNavigation();

	const goBack = () => navigation.goBack();
	const onImportFinished = () => navigation.navigate('WalletCreatedScreen');

	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const { address } = state.value;

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, [address]);

	const onSelectWallet = async (wallet: MinkeWallet) => {
		state.set(await walletState(wallet));
		navigation.navigate('WalletScreen');
	};

	return {
		address,
		wallets,
		goBack,
		onImportFinished,
		onSelectWallet,
		isModalVisible,
		setModalVisible
	};
};
