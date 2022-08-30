import React, { useEffect, useMemo } from 'react';
import { forEach } from 'lodash';
import { IconItem } from '@components';
import { useLanguage, useNavigation, useWallets } from '@hooks';
import { findLatestBackUpOnICloud } from '@models/backup';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';

interface ImportModalProps {
	onImportSeed: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onImportSeed }) => {
	const { i18n } = useLanguage();
	const { wallets } = useWallets();
	const navigation = useNavigation();
	const [latestBackup, setLatestBackup] = React.useState<string | null>();

	useEffect(() => {
		const fetchBackupsFiles = async () => {
			setLatestBackup(await findLatestBackUpOnICloud());
		};

		fetchBackupsFiles();
	}, []);

	const onICloudBackup = () => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
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

	return (
		<>
			<IconItem
				title="Import existing wallet"
				icon="help"
				onPress={() => null}
				mb="m"
				component
			/>

			<IconItem
				title="Import with secret phrase"
				icon="key"
				onPress={onImportSeed}
				mb="m"
			/>

			{(walletsBackedUp > 0 || !!latestBackup) && (
				<IconItem
					title={i18n.t('ImportWalletScreen.restore_from_icloud', { cloudPlatform })}
					{...(walletsBackedUp > 0 && {
						desc: `${i18n.t('ImportWalletScreen.backup_wallets_count', {
							count: walletsBackedUp,
							plural: walletsBackedUp > 1 ? 's' : ''
						})}`
					})}
					icon="cloud"
					onPress={onICloudBackup}
					mb="m"
				/>
			)}
		</>
	);
};

export default ImportModal;
