import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from '@hookstate/core';
import { BasicLayout } from '@layouts';
import { Button, Text, Icon, ScreenLoadingIndicator, LoadingScreen, ModalReusables, Modal } from '@components';
import { smallWalletAddress, getSeedPhrase, MinkeWallet } from '@models/wallet';
import { backupImg } from '@images';
import { useNavigation, iCloudBackup, useWallets, useAuthentication, useLanguage } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { walletState, globalWalletState } from '@src/stores/WalletStore';
import styles from './BackupStatusScreen.styles';

const BackedUp: React.FC<{ address: string }> = ({ address }) => {
	const { i18n } = useLanguage();
	return (
		<>
			<Text weight="extraBold" type="h2" center marginBottom={24} width={275}>
				{i18n.t('BackupStatusScreen.your_wallet_is_backed_up')}
			</Text>
			<Text type="p" weight="regular" center marginBottom={48}>
				{smallWalletAddress(address, 9)}
			</Text>
			<Text weight="medium" center marginBottom={40}>
				{i18n.t('BackupStatusScreen.if_you_lose')}
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
			<Text weight="extraBold" type="h2" center marginBottom={24} width={275} color="alert1">
				{i18n.t('BackupStatusScreen.your_wallet_is_not_backed_up')}
			</Text>
			<Text type="p" weight="regular" center marginBottom={48}>
				{smallWalletAddress(address, 9)}
			</Text>
			<Text weight="medium" center marginBottom={40}>
				{i18n.t('BackupStatusScreen.your_keys_your_coins')}
			</Text>
			<Button
				title={i18n.t('BackupStatusScreen.back_up_to_icloud')}
				onPress={handleIcloudBackup}
				iconRight="cloudStroke"
				marginBottom={24}
			/>
		</>
	);
};

type Props = NativeStackScreenProps<RootStackParamList, 'BackupStatusScreen'>;
const BackupStatusScreen = ({ route }: Props) => {
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
		navigation.navigate('WalletScreen');
	};

	return (
		<>
			<BasicLayout>
				<View style={styles.header}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" color="text7" size={24} />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('WalletScreen')}>
						<Text weight="medium" color="text7" type="a">
							{i18n.t('BackupStatusScreen.done')}
						</Text>
					</TouchableOpacity>
				</View>

				<ScrollView
					style={styles.padding}
					contentContainerStyle={{
						alignItems: 'center'
					}}
				>
					<View style={{ width: '100%', marginBottom: 32 }}>
						<Text weight="extraBold" type="h3">
							{i18n.t('BackupStatusScreen.backup')}
						</Text>
					</View>

					<Image source={backupImg} style={styles.image} />

					{finishedBackup || backedUp ? (
						<BackedUp {...{ address }} />
					) : (
						<NotBackedUp {...{ address, handleIcloudBackup }} />
					)}
					{address !== addressState && (
						<Button
							title={i18n.t('BackupStatusScreen.go_to_wallet')}
							marginBottom={21}
							onPress={() => onSelectWallet(wallet)}
						/>
					)}
					{seed.value && (
						<Button
							onPress={() =>
								showAuthenticationPrompt({
									onSuccess: () => navigation.navigate('ManualBackupScreen', { walletId })
								})}
							title={i18n.t('BackupStatusScreen.view_secret_phrase')}
							mode="outlined"
						/>
					)}
				</ScrollView>
			</BasicLayout>

			<Modal isVisible={!!error} onDismiss={() => setError(undefined)}>
				<ModalReusables.Error
					onDismiss={() => setError(undefined)}
					title={i18n.t('BackupStatusScreen.backup_error')}
					description={error}
				/>
			</Modal>
		</>
	);
};

export default BackupStatusScreen;
