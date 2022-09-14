import { useState, useEffect } from 'react';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { walletState } from '@src/stores/WalletStore';
import { useWalletState, useNavigation } from '@hooks';

export const useAccountsScreen = () => {
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();
	const onImportWallet = () => navigation.navigate('ImportWalletScreen');

	const { state } = useWalletState();
	const { address } = state.value;

	const [wallets, setWallets] = useState<AllMinkeWallets | null>();

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
