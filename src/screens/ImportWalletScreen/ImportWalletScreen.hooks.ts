import React, { useEffect, useMemo } from 'react';
import { useNavigation, useNetwork, useWallets } from '@hooks';
import { findLatestBackUpOnICloud } from '@models/backup';
import { forEach } from 'lodash';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useState } from '@hookstate/core';
import { globalWalletState, walletState } from '@stores/WalletStore';
import { MinkeWallet } from '@models/wallet';
import { networks } from '@models/network';

const useImportWalletScreen = () => {
	const navigation = useNavigation();
	const connector = useWalletConnect();
	const { connected, accounts, chainId } = connector;
	const state = useState(globalWalletState());
	const { address } = state.value;
	const { selectNetwork, network } = useNetwork();

	const onICloudBackup = () => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
	};
	const goBack = () => navigation.goBack();

	const { wallets } = useWallets();
	const [latestBackup, setLatestBackup] = React.useState<string | null>();

	useEffect(() => {
		const fetchBackupsFiles = async () => {
			setLatestBackup(await findLatestBackUpOnICloud());
		};

		fetchBackupsFiles();
	}, []);

	useEffect(() => {
		const switchWalletConnectAccount = async () => {
			if (!accounts) return;
			const newNetwork = Object.values(networks).find((n) => n.chainId === chainId);
			if (!newNetwork) return; // @TODO: @Marcos deal with it

			if (chainId !== network.chainId) {
				await selectNetwork(newNetwork);
			}

			const [newAccount] = accounts;
			const isNotConnected = newAccount !== address;
			if (newAccount && isNotConnected) {
				const savedWallet = Object.values(wallets).find((wallet) => wallet.address === newAccount);

				if (savedWallet) {
					state.set(await walletState(savedWallet));
					navigation.navigate('WalletScreen');
				} else {
					const minkeWallet: MinkeWallet = {
						id: `wallet_${Date.now()}`,
						address: newAccount,
						backedUp: false,
						name: '',
						network: chainId.toString(),
						primary: false
					};
					state.set(await walletState(minkeWallet));
					navigation.navigate('WalletScreen');
				}
			}
		};

		switchWalletConnectAccount();
	}, [accounts, chainId]);

	const walletsBackedUp = useMemo(() => {
		let count = 0;
		forEach(wallets, (wallet) => {
			if (wallet.backedUp) {
				count += 1;
			}
		});
		return count;
	}, [wallets]);

	const toggleWalletConnect = () => {
		if (connected) {
			connector.killSession();
		} else {
			connector.connect();
		}
	};

	return {
		onICloudBackup,
		goBack,
		walletsBackedUp,
		latestBackup,
		toggleWalletConnect,
		connected
	};
};

export default useImportWalletScreen;
