import React from 'react';
import { IconItem } from '@components';
import { useLanguage } from '@hooks';
import { smallWalletAddress } from '@models/wallet';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import useImportWalletScreen from '@src/screens/ImportWalletScreen/ImportWalletScreen.hooks';

interface ImportModalProps {
	onImportSeed: () => void;
	onDismiss: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onImportSeed, onDismiss }) => {
	const { i18n } = useLanguage();
	const { walletsBackedUp, onICloudBackup } = useImportWalletScreen();

	const backupICloud = async () => {
		onDismiss();
		await onICloudBackup();
	};

	return (
		<>
			<IconItem
				title={i18n.t('HomeScreen.Assets.Modals.restore_from_cloud', { cloudPlatform })}
				{...(walletsBackedUp > 0 && {
					desc: `${i18n.t('HomeScreen.Assets.Modals.backup_wallets_count', {
						count: walletsBackedUp,
						plural: walletsBackedUp > 1 ? 's' : ''
					})}`
				})}
				icon="cloud"
				onPress={backupICloud}
				mb="m"
			/>
		</>
	);
};

export default ImportModal;
