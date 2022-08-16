import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { BasicLayout } from '@layouts';
import { walletCreatedImg } from '@images';
import { Text, Button, ScreenLoadingIndicator, LoadingScreen, ModalBase, ModalReusables } from '@components';
import { iCloudBackup, useLanguage } from '@hooks';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import RNUxcam from 'react-native-ux-cam';
import styles from './WalletCreatedScreen.styles';
import { useWalletCreatedScreen } from './WalletCreatedScreen.hooks';

const WalletCreatedScreen = () => {
	RNUxcam.tagScreenName('WalletCreatedScreen');
	const { i18n } = useLanguage();
	const { backupManually, seed, walletId } = useWalletCreatedScreen();
	const [error, setError] = React.useState<string | undefined>();
	const { handleIcloudBackup, isWalletLoading, backupError } = iCloudBackup(walletId || '');

	useEffect(() => {
		setError(backupError);
	}, [backupError]);

	if (seed.promised) return <ScreenLoadingIndicator />;
	if (isWalletLoading) return <LoadingScreen title={isWalletLoading} />;

	return (
		<>
			<BasicLayout>
				<View style={styles.container}>
					<Image source={walletCreatedImg} style={styles.image} />

					<View style={styles.textContainer}>
						<Text center weight="extraBold" type="h2" marginBottom={16}>
							{i18n.t('WalletCreatedScreen.wallet_created')}
						</Text>
						<Text center color="text2" width={258}>
							{i18n.t('WalletCreatedScreen.need_backup')}
						</Text>
					</View>

					<View style={styles.buttonContainer}>
						<Button
							title={i18n.t('Components.Buttons.backup_to_icloud', { cloudPlatform })}
							iconRight="cloudStroke"
							onPress={handleIcloudBackup}
							marginBottom={14}
						/>
						<Button
							title={i18n.t('Components.Buttons.backup_manually')}
							mode="text"
							onPress={backupManually}
						/>
					</View>
				</View>
			</BasicLayout>
			<ModalBase isVisible={!!error} onDismiss={() => setError(undefined)}>
				<ModalReusables.Error
					onDismiss={() => setError(undefined)}
					title={i18n.t('WalletCreatedScreen.modal_error')}
					description={error}
				/>
			</ModalBase>
		</>
	);
};

export default WalletCreatedScreen;
