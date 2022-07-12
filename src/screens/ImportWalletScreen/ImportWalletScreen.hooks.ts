import { useEffect, useMemo, useState } from 'react';
import { useNavigation, useWallets } from '@hooks';
import { findLatestBackUpOnICloud } from '@models/backup';
import { forEach } from 'lodash';

const useImportWalletScreen = () => {
	const navigation = useNavigation();
	const onICloudBackup = () => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
	};
	const goBack = () => navigation.goBack();

	const { wallets } = useWallets();
	const [latestBackup, setLatestBackup] = useState<string | null>();

	useEffect(() => {
		const fetchBackupsFiles = async () => {
			setLatestBackup(await findLatestBackUpOnICloud());
		};

		fetchBackupsFiles();
	}, []);

	const walletsBackedUp = useMemo(() => {
		let count = 0;
		forEach(wallets, (wallet) => {
			if (wallet.backedUp) {
				count += 1;
			}
		});
		return count;
	}, [wallets]);

	return {
		onICloudBackup,
		goBack,
		walletsBackedUp,
		latestBackup
	};
};

export default useImportWalletScreen;
