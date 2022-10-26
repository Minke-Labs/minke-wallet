import React, { useEffect } from 'react';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { globalWalletState, walletState } from '@src/stores/WalletStore';
import { useNavigation } from '@hooks';
import { useState } from '@hookstate/core';

export const useAccountsScreen = () => {
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();
	const onImportWallet = () => navigation.navigate('ImportWalletScreen');

	const state = useState(globalWalletState());
	const { address } = state.value;

	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, [address]);

	const onSelectWallet = async (wallet: MinkeWallet) => {
		state.set(await walletState(wallet));
		navigation.navigate('HomeScreen');
	};

	return {
		address,
		wallets,
		onImportWallet,
		goBack,
		onSelectWallet
	};
};
