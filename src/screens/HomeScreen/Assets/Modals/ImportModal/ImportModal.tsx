import React from 'react';
import { IconItem } from '@components';
import { useGlobalWalletState, useLanguage } from '@hooks';
import { smallWalletAddress } from '@models/wallet';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import useImportWalletScreen from '@src/screens/ImportWalletScreen/ImportWalletScreen.hooks';

interface ImportModalProps {
	onImportSeed: () => void;
	onDismiss: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onImportSeed, onDismiss }) => {
	const { i18n } = useLanguage();
	const { address } = useGlobalWalletState();
	const { toggleWalletConnect, connected, walletsBackedUp, onICloudBackup } = useImportWalletScreen();

	const backupICloud = async () => {
		onDismiss();
		await onICloudBackup();
	};

	const walletConnect = () => {
		toggleWalletConnect();
		onDismiss();
	};

	return (
		<>
			<IconItem
				title={
					connected
						? `${i18n.t('HomeScreen.Assets.Modals.disconnect_wallet')} - ${smallWalletAddress(address)}`
						: i18n.t('HomeScreen.Assets.Modals.connect_wallet')
				}
				icon="help"
				onPress={walletConnect}
				mb="m"
				images
			/>

			<IconItem
				title={i18n.t('HomeScreen.Assets.Modals.import_with_secret_phrase')}
				icon="key"
				onPress={onImportSeed}
				mb="m"
			/>

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
