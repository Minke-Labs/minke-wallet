import { useState, useEffect } from 'react';
import { getAllWallets, AllMinkeWallets } from '@models/wallet';
import { useNavigation, useGlobalWalletState } from '@hooks';

export const useBackupSettingsScreen = () => {
	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	const [wallets, setWallets] = useState<AllMinkeWallets | null>();
	const { address } = useGlobalWalletState();

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
