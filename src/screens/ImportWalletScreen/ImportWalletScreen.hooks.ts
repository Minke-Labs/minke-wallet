import React, { useEffect, useMemo } from 'react';
import { useNavigation, useWallets } from '@hooks';
import { findLatestBackUpOnICloud } from '@models/backup';
import { forEach } from 'lodash';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useState } from '@hookstate/core';
import { globalWalletState, walletState } from '@stores/WalletStore';
import { MinkeWallet } from '@models/wallet';
import { Network, networks } from '@models/network';

const useImportWalletScreen = () => {
	const navigation = useNavigation();
	const connector = useWalletConnect();
	const { connected, accounts, chainId } = connector;
	const state = useState(globalWalletState());
	const { address, network } = state.value;
	const [error, setError] = React.useState<'no_network'>();
	const [destNetwork, setDestNetwork] = React.useState<Network>();
	const [importSeed, setImportSeed] = React.useState(false);

	const onICloudBackup = () => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
	};
	const goBack = () => navigation.navigate('WalletScreen');

	const { wallets } = useWallets();
	const [latestBackup, setLatestBackup] = React.useState<string | null>();

	const dismissError = () => {
		setError(undefined);
	};

	const dismissWrongNetwork = () => {
		setDestNetwork(undefined);

		if (connected) {
			connector.killSession();
		}
	};

	const onSeedImportFinished = () => {
		setImportSeed(false);
		navigation.navigate('WalletCreatedScreen');
	};

	useEffect(() => {
		const fetchBackupsFiles = async () => {
			setLatestBackup(await findLatestBackUpOnICloud());
		};

		fetchBackupsFiles();
	}, []);

	useEffect(() => {
		const switchWalletConnectAccount = async () => {
			if (!accounts || accounts.length === 0) return;
			const newNetwork = Object.values(networks).find((n) => n.chainId === chainId);
			if (!newNetwork) {
				connector.killSession();
				setError('no_network'); // we dont support the desired network
				return;
			}

			if (chainId !== network.chainId && connected) {
				setDestNetwork(newNetwork); // ask user to change network
				return;
			}

			setDestNetwork(undefined);
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
	}, [accounts, chainId, error, network.chainId, connected]);

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
		address,
		onICloudBackup,
		goBack,
		walletsBackedUp,
		latestBackup,
		toggleWalletConnect,
		connected,
		error,
		dismissError,
		destNetwork,
		dismissWrongNetwork,
		importSeed,
		setImportSeed,
		onSeedImportFinished
	};
};

export default useImportWalletScreen;
