/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { useLanguage } from '@hooks';
import {
	ModalBase,
	ModalReusables,
	SettingsHeader,
	View,
	IconItem
} from '@components';
import { BasicLayout } from '@layouts';
// import { metamask, trustWallet, rainbow } from '@images';
// import { smallWalletAddress } from '@models/wallet';
// import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import styles from './ImportWalletScreen.styles';
import useImportWalletScreen from './ImportWalletScreen.hooks';

const ImportWalletScreen = () => {
	const { i18n } = useLanguage();
	// const { colors } = useTheme();
	const {
		// address,
		goBack,
		// onICloudBackup,
		// walletsBackedUp,
		// latestBackup,
		// connected,
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
				<SettingsHeader title={i18n.t('ImportWalletScreen.import_wallet')} onPress={goBack} />

				<View style={styles.container}>

					<IconItem
						title="Import with secret phrase"
						icon="key"
						onPress={() => setImportSeed(true)}
						mb="m"
					/>

					<IconItem
						title="Import existing wallet"
						icon="help"
						onPress={toggleWalletConnect}
						mb="m"
						component
					/>
					{/* @@@:TODO - SEE HOW THIS WORKS */}
					{/*
					<TouchableOpacity style={styles.option} onPress={toggleWalletConnect}>
						<View style={styles.leftContainer}>
							<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
								<Icon name="help" size={24} color="text7" />
							</View>
							<Text weight="semiBold" type="tSmall" style={{ marginHorizontal: 16 }}>
								{connected
									? `${i18n.t('ImportWalletScreen.disconnect_wallet')} - ${smallWalletAddress(
											address
									  )}`
									: i18n.t('ImportWalletScreen.connect_wallet')}
							</Text>
							<View style={styles.row}>
								<Image source={metamask} style={styles.walletImage} />
								<Image source={trustWallet} style={styles.walletImage} />
								<Image source={rainbow} style={styles.walletImage} />
							</View>
						</View>
					</TouchableOpacity> */}

					{/* {(walletsBackedUp > 0 || !!latestBackup) && (
						<TouchableOpacity style={styles.option} onPress={onICloudBackup}>
							<View style={styles.leftContainer}>
								<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
									<Icon name="backupStroke" size={24} color="text7" />
								</View>
								<View style={{ marginLeft: 16 }}>
									<Text weight="semiBold" type="tSmall">
										{i18n.t('ImportWalletScreen.restore_from_icloud', {
											cloudPlatform
										})}
									</Text>
									{walletsBackedUp > 0 && (
										<Text type="a">
											{i18n.t('ImportWalletScreen.backup_wallets_count', {
												count: walletsBackedUp,
												plural: walletsBackedUp > 1 ? 's' : ''
											})}
										</Text>
									)}
								</View>
							</View>
						</TouchableOpacity>
					)} */}
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
