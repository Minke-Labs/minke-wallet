import { forEach } from 'lodash';
import React, { useMemo } from 'react';
import { Alert } from 'react-native';

import { useLanguage, useNavigation, useWallets } from '@hooks';
import { findLatestBackUpOnICloud } from '@models/backup';
import { Network } from '@models/network';

const useImportWalletScreen = () => {
	const navigation = useNavigation();
	const [error, setError] = React.useState<'no_network'>();
	const [destNetwork, setDestNetwork] = React.useState<Network>();
	const [importSeed, setImportSeed] = React.useState(false);
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

	return {
		onICloudBackup,
		goBack,
		walletsBackedUp,
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
