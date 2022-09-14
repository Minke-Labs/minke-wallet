import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { walletCreatedImg } from '@images';
import {
	Text,
	Button,
	ScreenLoadingIndicator,
	LoadingScreen,
	ModalBase,
	ModalReusables,
	View
} from '@components';
import { iCloudBackup, useLanguage } from '@hooks';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import { useWalletCreatedScreen } from './WalletCreatedScreen.hooks';

const WalletCreatedScreen = () => {
	RNUxcam.tagScreenName('WalletCreatedScreen');
	const { i18n } = useLanguage();
	const { backupManually, seed, walletId } = useWalletCreatedScreen();
	const [error, setError] = useState<string | undefined>();
	const { handleIcloudBackup, isWalletLoading, backupError } = iCloudBackup(walletId || '');

	useEffect(() => {
		setError(backupError);
	}, [backupError]);

	if (seed.promised) return <ScreenLoadingIndicator />;
	if (isWalletLoading) return <LoadingScreen title={isWalletLoading} />;

	return (
		<>
			<BasicLayout>
				<View flex1 main="space-between" cross="center">
					<Image
						source={walletCreatedImg}
						style={{ width: 263, height: 320 }}
					/>

					<View>
						<Text center weight="bold" type="hMedium" mb="xxs">
							{i18n.t('WalletCreatedScreen.wallet_created')}
						</Text>
						<Text center type="bMedium" color="text2" width={279}>
							{i18n.t('WalletCreatedScreen.need_backup')}
						</Text>
					</View>

					<View ph="s" mb="xl">
						<Button
							title={i18n.t('Components.Buttons.backup_to_icloud', { cloudPlatform })}
							iconRight="cloud"
							onPress={handleIcloudBackup}
							mb="xs"
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
