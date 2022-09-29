import React, { useState, useEffect, useMemo } from 'react';
import { forEach } from 'lodash';
import { IconItem } from '@components';
import { useGlobalWalletState, useLanguage, useNavigation, useWallets } from '@hooks';
import { smallWalletAddress } from '@models/wallet';
import { findLatestBackUpOnICloud } from '@models/backup';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import useImportWalletScreen from '@src/screens/ImportWalletScreen/ImportWalletScreen.hooks';

interface ImportModalProps {
	onImportSeed: () => void;
	onDismiss: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onImportSeed, onDismiss }) => {
	const { i18n } = useLanguage();
	const { wallets } = useWallets();
	const navigation = useNavigation();
	const [latestBackup, setLatestBackup] = useState<string | null>();
	const { address } = useGlobalWalletState();
	const { toggleWalletConnect, connected } = useImportWalletScreen();

	useEffect(() => {
		const fetchBackupsFiles = async () => {
			setLatestBackup(await findLatestBackUpOnICloud());
		};

		fetchBackupsFiles();
	}, []);

	const onICloudBackup = () => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
		onDismiss();
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
				title={
					connected
						? `${i18n.t('HomeScreen.Assets.Modals.disconnect_wallet')} - ${smallWalletAddress(address)}`
						: i18n.t('HomeScreen.Assets.Modals.connect_wallet')
				}
				icon="help"
				onPress={toggleWalletConnect}
				mb="m"
				images
			/>

			<IconItem
				title={i18n.t('HomeScreen.Assets.Modals.import_with_secret_phrase')}
				icon="key"
				onPress={onImportSeed}
				mb="m"
			/>

			{(walletsBackedUp > 0 || !!latestBackup) && (
				<IconItem
					title={i18n.t('HomeScreen.Assets.Modals.restore_from_cloud', { cloudPlatform })}
					{...(walletsBackedUp > 0 && {
						desc: `${i18n.t('HomeScreen.Assets.Modals.backup_wallets_count', {
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
