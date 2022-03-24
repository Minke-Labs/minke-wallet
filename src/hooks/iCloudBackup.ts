import { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import useNavigation from './useNavigation';
import useWalletCloudBackup from './useWalletCloudBackup';
import useWallets from './useWallets';

const iCloudBackup = (walletId: string) => {
	const navigation = useNavigation();
	const [backupError, setBackupError] = useState<string | undefined>();
	const { walletById } = useWallets();
	const { backedUp, address } = walletById(walletId) || {};
	const { walletCloudBackup, isWalletLoading } = useWalletCloudBackup();

	const onError = useCallback(
		(message: string) => {
			Keyboard.dismiss();
			setBackupError(message);
		},
		[walletId, backedUp, address]
	);

	const handleNoLatestBackup = useCallback(() => {
		setBackupError(undefined);
		navigation.navigate('BackupToICloudScreen', { missingPassword: true, walletId });
	}, [walletId, backedUp, address]);

	const handlePasswordNotFound = useCallback(() => {
		setBackupError(undefined);
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, walletId });
	}, [walletId, backedUp, address]);

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

	return { handleIcloudBackup, isWalletLoading, backupError };
};

export default iCloudBackup;
