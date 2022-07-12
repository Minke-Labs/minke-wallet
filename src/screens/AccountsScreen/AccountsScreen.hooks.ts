import React, { useEffect } from 'react';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { walletState } from '@src/stores/WalletStore';
import { useWalletState, useNavigation } from '@hooks';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

export const useAccountsScreen = () => {
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();
	const onImportWallet = () => navigation.navigate('ImportWalletScreen');
	const connector = useWalletConnect();

	const { state } = useWalletState();
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
		const { connected, accounts } = connector;
		if (connected && accounts[0] !== wallet.address) {
			connector.killSession();
		}
		navigation.navigate('WalletScreen');
	};

	return {
		address,
		wallets,
		onImportWallet,
		goBack,
		onSelectWallet
	};
};
