import React, { useMemo } from 'react';
import { useLanguage, useNavigation, useWallets } from '@hooks';
import { findLatestBackUpOnICloud } from '@models/backup';
import { forEach } from 'lodash';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useState } from '@hookstate/core';
import { globalWalletState, walletState } from '@stores/WalletStore';
import { MinkeWallet } from '@models/wallet';
import { Network, networks } from '@models/network';
import { Alert } from 'react-native';

const useImportWalletScreen = () => {
	const navigation = useNavigation();
	const connector = useWalletConnect();
	const { connected, accounts: connectedAccounts } = connector;
	const state = useState(globalWalletState());
	const { address, network } = state.value;
	const [error, setError] = React.useState<'no_network'>();
	const [destNetwork, setDestNetwork] = React.useState<Network>();
	const [importSeed, setImportSeed] = React.useState(false);
	const [importedAccount, setImportAccount] = React.useState('');
	const { i18n } = useLanguage();

	const goBack = () => navigation.goBack();
	const { wallets } = useWallets();

	const dismissError = () => {
		setError(undefined);
	};

	const dismissWrongNetwork = () => {
		setDestNetwork(undefined);
	};

	const onSeedImportFinished = () => {
		setImportSeed(false);
		navigation.navigate('WalletCreatedScreen');
	};

	const switchWallet = async (newAccount: string) => {
		setDestNetwork(undefined);
		const isNotConnected = newAccount !== address;
		if (newAccount && isNotConnected) {
			const savedWallet = Object.values(wallets).find((wallet) => wallet.address === newAccount);

			if (savedWallet) {
				state.set(await walletState(savedWallet));
				navigation.navigate('HomeScreen');
			} else {
				const minkeWallet: MinkeWallet = {
					id: `wallet_${Date.now()}`,
					address: newAccount,
					backedUp: false,
					name: '',
					network: network.id,
					primary: false
				};
				state.set(await walletState(minkeWallet));
				navigation.navigate('HomeScreen');
			}
		}
	};

	const onNetworkChange = async () => {
		await switchWallet(importedAccount);
		navigation.navigate('HomeScreen');
	};

	const switchWalletConnectAccount = async (accounts: string[], chainId: number) => {
		if (!accounts || accounts.length === 0) return;
		const newNetwork = Object.values(networks).find((n) => n.chainId === chainId);
		if (!newNetwork) {
			connector.killSession();
			setError('no_network'); // we dont support the desired network
			return;
		}

		if (chainId !== network.chainId) {
			setImportAccount(accounts[0]);
			setDestNetwork(newNetwork); // ask user to change network
			return;
		}

		await switchWallet(accounts[0]);
	};

	connector.on('connect', (e, payload) => {
		if (e) {
			throw e;
		}

		const { accounts, chainId } = payload.params[0];
		switchWalletConnectAccount(accounts, chainId);
	});

	const onICloudBackup = async () => {
		const latestBackup = await findLatestBackUpOnICloud();

		if (latestBackup) {
			navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
		} else {
			Alert.alert(i18n.t('HomeScreen.Assets.Modals.no_backups_found'));
		}
	};

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
			connector.on('connect', (e, payload) => {
				if (e) {
					throw e;
				}
				const { accounts, chainId } = payload.params[0];
				switchWalletConnectAccount(accounts, chainId);
			});
			connector.connect({ chainId: network.chainId });
		}
	};

	return {
		address: connectedAccounts[0],
		onICloudBackup,
		goBack,
		walletsBackedUp,
		toggleWalletConnect,
		connected,
		error,
		dismissError,
		destNetwork,
		dismissWrongNetwork,
		importSeed,
		setImportSeed,
		onSeedImportFinished,
		onNetworkChange,
		connector,
		switchWalletConnectAccount
	};
};

export default useImportWalletScreen;
