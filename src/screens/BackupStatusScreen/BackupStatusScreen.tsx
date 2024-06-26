import React, { useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { Button, Text, ScreenLoadingIndicator, LoadingScreen, ModalReusables, ModalBase, Header } from '@components';
import RNUxcam from 'react-native-ux-cam';
import { smallWalletAddress, getSeedPhrase, MinkeWallet } from '@models/wallet';
import { backupImg } from '@images';
import { useNavigation, iCloudBackup, useWallets, useAuthentication, useLanguage } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { globalWalletState, walletState } from '@src/stores/WalletStore';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import styles from './BackupStatusScreen.styles';

const BackedUp: React.FC<{ address: string }> = ({ address }) => {
	const { i18n } = useLanguage();
	return (
		<>
			<Text weight="extraBold" type="h2" center mb="s" width={275}>
				{i18n.t('BackupStatusScreen.your_wallet_is_backed_up')}
			</Text>
			<Text type="p" weight="regular" center mb="xl">
				{smallWalletAddress(address, 9)}
			</Text>
			<Text weight="medium" center mb="l">
				{i18n.t('BackupStatusScreen.if_you_lose', { cloudPlatform })}
			</Text>
		</>
	);
};

const NotBackedUp: React.FC<{ handleIcloudBackup: () => void; address: string }> = ({
	address,
	handleIcloudBackup
}) => {
	const { i18n } = useLanguage();
	return (
		<>
			<Text weight="extraBold" type="h2" center mb="s" width={275} color="alert1">
				{i18n.t('BackupStatusScreen.your_wallet_is_not_backed_up')}
			</Text>
			<Text type="p" weight="regular" center mb="xl">
				{smallWalletAddress(address, 9)}
			</Text>
			<Text weight="medium" center mb="l">
				{i18n.t('BackupStatusScreen.your_keys_your_coins')}
			</Text>
			<Button
				title={i18n.t('BackupStatusScreen.back_up_to_icloud', { cloudPlatform })}
				onPress={handleIcloudBackup}
				iconRight="cloud"
				mb="s"
			/>
		</>
	);
};

type Props = NativeStackScreenProps<RootStackParamList, 'BackupStatusScreen'>;
const BackupStatusScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('BackupStatusScreen');
	const { i18n } = useLanguage();
	const state = useState(globalWalletState());
	const { address: addressState } = state.value;

	const navigation = useNavigation();
	const { walletId, finishedBackup } = route.params;
	const [error, setError] = React.useState<string | undefined>();

	const loadSeed = getSeedPhrase(walletId || '');
	const seed = useState(loadSeed);
	const { wallets } = useWallets();

	const wallet: MinkeWallet = wallets[walletId];

	const { handleIcloudBackup, isWalletLoading, backupError } = iCloudBackup(walletId);

	const { showAuthenticationPrompt } = useAuthentication();

	useEffect(() => {
		setError(backupError);
	}, [backupError]);

	if (seed.promised || !wallet) {
		return <ScreenLoadingIndicator />;
	}

	const { address, backedUp } = wallet;

	if (isWalletLoading) {
		return <LoadingScreen title={isWalletLoading} />;
	}

	const onSelectWallet = async (walletIn: MinkeWallet) => {
		state.set(await walletState(walletIn));
		navigation.navigate('HomeScreen');
	};

	return (
		<>
			<BasicLayout>
				<Header title={i18n.t('BackupStatusScreen.backup')} done />

				<ScrollView
					style={styles.padding}
					contentContainerStyle={{
						alignItems: 'center'
					}}
				>
					<Image source={backupImg} style={styles.image} />

					{finishedBackup || backedUp ? (
						<BackedUp {...{ address }} />
					) : (
						<NotBackedUp {...{ address, handleIcloudBackup }} />
					)}
					{address !== addressState && (
						<Button
							title={i18n.t('BackupStatusScreen.go_to_wallet')}
							mb="xs"
							onPress={() => onSelectWallet(wallet)}
						/>
					)}
					{seed.value && (
						<Button
							onPress={
								() =>
									showAuthenticationPrompt({
										onSuccess: () => navigation.navigate('ManualBackupScreen', { walletId })
									})
								// eslint-disable-next-line react/jsx-curly-newline
							}
							title={i18n.t('BackupStatusScreen.view_secret_phrase')}
							mode="outlined"
						/>
					)}
				</ScrollView>
			</BasicLayout>

			<ModalBase isVisible={!!error} onDismiss={() => setError(undefined)}>
				<ModalReusables.Error
					onDismiss={() => setError(undefined)}
					title={i18n.t('BackupStatusScreen.backup_error')}
					description={error}
				/>
			</ModalBase>
		</>
	);
};

export default BackupStatusScreen;
