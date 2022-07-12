import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useLanguage, useTheme } from '@hooks';
import { Icon, SettingsHeader, Text } from '@components';
import { BasicLayout } from '@layouts';
import { metamask, trustWallet, rainbow } from '@images';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import styles from './ImportWalletScreen.styles';
import useImportWalletScreen from './ImportWalletScreen.hooks';

const ImportWalletScreen = () => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const { goBack, onICloudBackup, walletsBackedUp, latestBackup, connected, toggleWalletConnect } =
		useImportWalletScreen();

	// @TODO: Import with seed phrase
	return (
		<BasicLayout>
			<SettingsHeader title={i18n.t('ImportWalletScreen.import_wallet')} onPress={goBack} />

			<View style={styles.container}>
				<TouchableOpacity style={styles.option} onPress={() => null}>
					<View style={styles.leftContainer}>
						<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
							<Icon name="vaultStroke" size={24} color="text7" />
						</View>
						<Text weight="semiBold" type="tSmall" style={{ marginLeft: 16 }} width={250}>
							{i18n.t('ImportWalletScreen.import_with_secret_phrase')}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.option} onPress={toggleWalletConnect}>
					<View style={styles.leftContainer}>
						<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
							<Icon name="helpStroke" size={24} color="text7" />
						</View>
						<Text weight="semiBold" type="tSmall" style={{ marginHorizontal: 16 }}>
							{connected
								? i18n.t('ImportWalletScreen.disconnect_wallet')
								: i18n.t('ImportWalletScreen.connect_wallet')}
						</Text>
						<View style={styles.row}>
							<Image source={metamask} style={styles.walletImage} />
							<Image source={trustWallet} style={styles.walletImage} />
							<Image source={rainbow} style={styles.walletImage} />
						</View>
					</View>
				</TouchableOpacity>
				{(walletsBackedUp > 0 || !!latestBackup) && (
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
				)}
			</View>
		</BasicLayout>
	);
};

export default ImportWalletScreen;
