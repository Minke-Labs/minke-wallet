import { useCallback } from 'react';
import useNavigation from './useNavigation';
import useWalletCloudBackup from './useWalletCloudBackup';
import useWallets from './useWallets';

const iCloudBackup = (walletId: string) => {
	const navigation = useNavigation();
	const { walletById } = useWallets();
	const { backedUp, address } = walletById(walletId) || {};
	const walletCloudBackup = useWalletCloudBackup();

	const handleNoLatestBackup = useCallback(() => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: true, walletId });
	}, [walletId, backedUp, address]);

	const handlePasswordNotFound = useCallback(() => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, walletId });
	}, [walletId, backedUp, address]);

	const onError = useCallback(
		(message) => {
			console.error('error', message);
		},
		[walletId, backedUp, address]
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
	}, [handleNoLatestBackup, handlePasswordNotFound, walletCloudBackup, walletId, backedUp, address]);

	return { handleIcloudBackup };
};

export default iCloudBackup;
