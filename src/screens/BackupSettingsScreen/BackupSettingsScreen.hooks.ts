import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { getAllWallets, AllMinkeWallets } from '@models/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { useNavigation } from '@hooks';

export const useBackupSettingsScreen = () => {
	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const { address } = state.value;

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, [address]);

	const onSelectWallet = async (walletId: string) => {
		navigation.navigate('BackupStatusScreen', { walletId });
	};

	return {
		wallets,
		goBack,
		onSelectWallet
	};
};
