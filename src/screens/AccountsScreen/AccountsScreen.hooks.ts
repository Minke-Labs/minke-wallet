import React, { useEffect } from 'react';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { walletState } from '@src/stores/WalletStore';
import { useWalletState, useNavigation } from '@hooks';

export const useAccountsScreen = () => {
	const navigation = useNavigation();

	const goBack = () => navigation.goBack();
	const onImportFinished = () => navigation.navigate('WalletCreatedScreen');

	const { state } = useWalletState();
	const { address } = state.value;

	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const [isModalVisible, setModalVisible] = React.useState(false);

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
