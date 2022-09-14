import { useState, useEffect } from 'react';
import { getAllWallets, AllMinkeWallets } from '@models/wallet';
import { useWalletState, useNavigation } from '@hooks';

export const useBackupSettingsScreen = () => {
	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	const [wallets, setWallets] = useState<AllMinkeWallets | null>();
	const { state } = useWalletState();
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
