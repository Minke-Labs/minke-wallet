import { useCallback } from 'react';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import useNavigation from './useNavigation';
import useWalletCloudBackup from './useWalletCloudBackup';

const iCloudBackup = () => {
	const navigation = useNavigation();
	const { walletId, backedUp } = useState(globalWalletState()).value;
	const walletCloudBackup = useWalletCloudBackup();

	const handleNoLatestBackup = useCallback(() => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: true });
	}, [walletId, backedUp]);

	const handlePasswordNotFound = useCallback(() => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false });
	}, [walletId, backedUp]);

	const onError = useCallback(
		(message) => {
			console.error('error', message);
		},
		[walletId, backedUp]
	);

	const handleIcloudBackup = useCallback(() => {
		if (backedUp || !walletId) {
			return;
		}

		walletCloudBackup({
			handleNoLatestBackup,
			handlePasswordNotFound,
			onError,
			walletId
		});
	}, [handleNoLatestBackup, handlePasswordNotFound, walletCloudBackup, walletId, backedUp]);

	return { handleIcloudBackup };
};

export default iCloudBackup;
