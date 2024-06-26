import React from 'react';
import RNUxcam from 'react-native-ux-cam';
import { useLanguage } from '@hooks';
import { ModalBase, ModalReusables, Header, View, IconItem } from '@components';
import { BasicLayout } from '@layouts';
import { smallWalletAddress } from '@models/wallet';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import useImportWalletScreen from './ImportWalletScreen.hooks';

const ImportWalletScreen = () => {
	RNUxcam.tagScreenName('ImportWalletScreen');
	const { i18n } = useLanguage();
	const {
		address,
		onICloudBackup,
		walletsBackedUp,
		connected,
		toggleWalletConnect,
		error,
		dismissError,
		destNetwork,
		dismissWrongNetwork,
		importSeed,
		setImportSeed,
		onSeedImportFinished,
		onNetworkChange
	} = useImportWalletScreen();

	return (
		<>
			<BasicLayout>
				<Header title={i18n.t('ImportWalletScreen.import_wallet')} done />

				<View pt="m" p="s">
					<IconItem
						title={i18n.t('ImportWalletScreen.import_with_secret_phrase')}
						icon="key"
						onPress={() => setImportSeed(true)}
						mb="m"
					/>

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
					/>
				</View>
			</BasicLayout>

			<ModalBase isVisible={importSeed} onDismiss={() => setImportSeed(false)}>
				<ModalReusables.ImportWallet
					onDismiss={() => setImportSeed(false)}
					onImportFinished={onSeedImportFinished}
				/>
			</ModalBase>

			<ModalBase isVisible={!!error} onDismiss={dismissError}>
				<ModalReusables.Error
					onDismiss={dismissError}
					description={i18n.t(`ImportWalletScreen.Error.${error}`)}
				/>
			</ModalBase>

			<ModalBase isVisible={!!destNetwork} onDismiss={dismissWrongNetwork}>
				{!!destNetwork && (
					<ModalReusables.WrongNetwork
						onDismiss={dismissWrongNetwork}
						network={destNetwork}
						description={i18n.t('ImportWalletScreen.please_change_network', { network: destNetwork.name })}
						onUpdate={onNetworkChange}
					/>
				)}
			</ModalBase>
		</>
	);
};

export default ImportWalletScreen;
